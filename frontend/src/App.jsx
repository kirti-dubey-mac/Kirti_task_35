import { useEffect, useState } from "react";
import { useWorkouts } from "./hooks/useWorkouts";
import { API_URL } from "./api";
import WorkoutDetails from "./Components/WorkoutDetails";
import WorkoutForm from "./Components/WorkoutForm";

function App() {
  const { workouts, dispatch } = useWorkouts();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/workouts`);
        const json = await res.json();
        if (res.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        } else {
          setError(json.error);
        }
      } catch {
        setError("Could not load workouts. Is the server running?");
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="app">
      <header>
        <h1>Workout Budyyy</h1>
      </header>
      <div className="pages">
        <div className="workouts">
          {error && <div className="error">{error}</div>}
          {workouts.length === 0 && !error && <p>No workouts yet.</p>}
          {workouts.map((w) => (
            <WorkoutDetails key={w._id} workout={w} />
          ))}
        </div>
        <WorkoutForm />
      </div>
    </div>
  );
}

export default App;