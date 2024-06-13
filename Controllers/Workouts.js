const { errorHandler } = require("../auth.js");
const Workouts = require("../Schema/Workouts.js");

module.exports.getMyWorkouts = (req, res) => {
     Workouts.find({})
          .then((result) => {
               console.log(result);
               if (!result) {
                    return res.status(404).send({
                         message: "Failed to get user workouts",
                    });
               }

               return res.status(200).send({
                    workouts: result,
               });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.addWorkout = (req, res) => {
     const { name, duration } = req.body;
     const { id } = req.user;

     Workouts.findOne({ userId: req.user.id, name: name })
          .then((result) => {
               if (result) {
                    return res.status(400).send({ message: "Workout already exist" });
               }
               let newWorkouts = new Workouts({
                    userId: id,
                    name,
                    duration,
               });
               console.log(id);
               newWorkouts
                    .save()
                    .then((result) => {
                         res.status(201).send({
                              message: "Added new workout workout",
                              result,
                         });
                    })
                    .catch((err) => errorHandler(err, req, res));
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.updateWorkout = (req, res) => {
     const { name, duration } = req.body;

     let updatedWorkout = {
          userId: req.user.id,
          name,
          duration,
     };

     const workoutId = req.params.workoutId;

     Workouts.findOneAndUpdate({ _id: workoutId }, updatedWorkout, { new: true })
          .then((result) => {
               if (!result) {
                    return res.status(404).send({
                         message: "Workout not found or failed to update",
                    });
               }

               res.status(200).send({
                    message: "Workout updated successfully",
                    result,
               });
          })
          .catch((err) => {
               console.error("Error updating workout:", err);
               res.status(500).send({
                    message: "Error updating workout",
               });
          });
};

module.exports.updateWorkoutStatus = (req, res) => {
     let updateStatus = {
          status: "completed",
     };

     Workouts.findOneAndUpdate({ _id: req.params.workoutId }, updateStatus, { new: true })
          .then((result) => {
               if (!result) {
                    return res.status(404).send({
                         message: "Workout not found or failed to update",
                    });
               }

               res.status(200).send({
                    message: "Workout status updated successfully",
                    result,
               });
          })
          .catch((err) => {
               console.error("Error updating workout:", err);
               res.status(500).send({
                    message: "Error updating workout",
               });
          });
};

module.exports.deleteWorkout = (req, res) => {
     Workouts.findByIdAndDelete(req.params.workoutId).then((result) => {
          if (!result) {
               return res.status(400).send({
                    message: "Failed to delete a  workout",
               });
          }

          return res.status(200).send({
               message: "Workout deleted successfully",
          });
     });
};
