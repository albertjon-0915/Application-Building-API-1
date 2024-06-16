const express = require("express");
const router = express.Router();
const auth = require("../auth.js");

const Workout = require("../Controllers/Workouts.js");

const { verify } = auth;

router.get("/getMyWorkouts", verify, Workout.getMyWorkouts);
router.get("/getMyWorkouts/:workoutId", verify, Workout.workoutDetail);
router.post("/addWorkout", verify, Workout.addWorkout);
router.patch("/updatedWorkout/:workoutId", verify, Workout.updateWorkout);
router.patch("/completeWorkoutStatus/:workoutId", verify, Workout.updateWorkoutStatus);
router.delete("/deleteWorkout/:workoutId", verify, Workout.deleteWorkout);

module.exports = router;
