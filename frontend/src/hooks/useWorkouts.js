import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkouts must be used inside WorkoutProvider");
  }
  return context;
};