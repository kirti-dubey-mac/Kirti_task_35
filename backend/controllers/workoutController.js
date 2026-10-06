const mongoose = require("mongoose");
const Workout = require("../models/Workout");

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { title, load, reps } = req.body;
    const workout = await Workout.create({ title, load, reps });
    res.status(201).json(workout);
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({ error: message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid workout id" });
  }
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getWorkouts, createWorkout, deleteWorkout };