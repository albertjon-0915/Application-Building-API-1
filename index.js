require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes.js");
const workoutRoutes = require("./Routes/workoutRoutes.js");

const app = express();

const corsOptions = {
     origin: [
          "https://localhost:4000",
          "http://localhost:3000",
          "https://app-building-full-stack-react-1.vercel.app",
          "https://application-building-api-1.onrender.com",
     ],
     credentials: true,
     optionsuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
     "mongodb+srv://admin:admin123@appbuildingapi1.xk4oims.mongodb.net/fitnessApp?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => console.log("Connected to mongoDB Atlas"));

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

if (require.main === module) {
     app.listen(4000, () => console.log("Connected to port 4000"));
}
