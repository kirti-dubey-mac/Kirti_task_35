import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useWorkouts } from "../hooks/useWorkouts";
import { API_URL } from "../api";

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkouts();
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/workouts/${workout._id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error);
        return;
      }
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    } catch {
      setError("Could not delete workout");
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p className="time">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button className="delete" onClick={handleDelete} aria-label="Delete workout">
        🗑
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}