const User = require("../Schema/User.js");
const bcrypt = require("bcrypt");
const { errorHandler, createAccessToken } = require("../auth.js");

module.exports.Register = (req, res) => {
     const { email, password } = req.body;
     console.log(email, password);
     User.findOne({ email: req.body.email })
          .then((result) => {
               if (result) {
                    return res.status(409).send({
                         message: "Duplicate email found",
                    });
               } else {
                    if (!email.includes("@")) {
                         return res.status(400).send({ message: "Invalid email" });
                    } else if (password.length < 8) {
                         return res.status(400).send({ message: "Invalid password" });
                    } else {
                         const { email, password } = req.body;

                         let newUser = new User({
                              email,
                              password,
                         });

                         newUser
                              .save()
                              .then((result) => {
                                   res.status(200).send({
                                        message: "User Registered Successfully",
                                        user: result,
                                   });
                              })
                              .catch((err) => errorHandler(err, req, res));
                    }
               }
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.Login = (req, res) => {
     const { email, password } = req.body;

     if (email.includes("@")) {
          User.findOne({ email: email })
               .then((result) => {
                    console.log(result);
                    if (!result) {
                         return res.status(404).send({ message: "No email found" });
                    } else {
                         console.log(password);
                         let isPasswordCorrect = bcrypt.compareSync(password, result.password);
                         if (isPasswordCorrect) {
                              return res.status(401).send({
                                   message: "Incorrect email or password",
                              });
                         }

                         return res.status(200).send({
                              message: "Login successfully",
                              access: createAccessToken(result),
                         });
                    }
               })
               .catch((err) => errorHandler(err, req, res));
     }
};

module.exports.getUserDetail = (req, res) => {
     User.findById(req.user.id )
          .then((result) => {
               console.log(result);

               if (!result) {
                    return res.status(404).send({
                         message: "Failed to get user",
                    });
               }

               return res.status(200).send(result);
          })
          .catch((err) => errorHandler(err, req, res));
};
