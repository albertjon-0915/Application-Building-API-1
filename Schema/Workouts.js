const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
     name: { type: "String", required: [true, "Input name of exercise"] },
     duration: { type: "String", required: [true, "Input duration"] },
     status: { type: "String", default: "pending" },
     dateAdded: { type: "Date", default: Date.now },
});

module.exports = mongoose.model("Workout", workoutSchema);
