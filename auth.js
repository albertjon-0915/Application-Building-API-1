require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports.createAccessToken = (user) => {
     const data = {
          id: user._id,
          email: user.email,
     };

     return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

module.exports.verify = (req, res, next) => {
     let token = req.headers.authorization;

     if (typeof token === undefined) {
          return res.send({ auth: "Failed! No token" });
     } else {
          token = token.slice(7, token.length);
          console.log(token);

          jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
               if (err) {
                    res.send({
                         auth: "failed",
                         message: err.message,
                    });
               } else {
                    console.log("Result from verify method: ", decodedToken);
                    req.user = decodedToken;
                    next();
               }
          });
     }
};

module.exports.errorHandler = (err, req, res, next) => {
     console.log(err);

     const statusCode = err.status || 500;
     const errorMessage = err.message || "Internal Server Error";

     res.status(statusCode).json({
          error: {
               message: errorMessage,
               errorCode: err.code || "SERVER_ERROR",
               details: err.details || null,
          },
     });
};
