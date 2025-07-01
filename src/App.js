import { useEffect, useState } from 'react';
import GoalTracker from './components/GoalTracker';
import Navbar from './components/Navbar';
import WorkoutHistory from './components/WorkoutHistory';
import WorkoutLogger from './components/WorkoutLogger';
//import './styles.css';

const App = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/workouts')
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

  const addWorkout = (workout) => {
    fetch('http://localhost:3001/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout)
    })
      .then((res) => res.json())
      .then((newWorkout) => setWorkouts([...workouts, newWorkout]));
  };

  const handleDeleteWorkout = (id) => {
    fetch(`http://localhost:3001/workouts/${id}`, {
      method: 'DELETE'
    })
      .then(() => setWorkouts(workouts.filter((w) => w.id !== id)))
      .catch((err) => console.error('Failed to delete workout:', err));
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4">
          <WorkoutLogger onAddWorkout={addWorkout} />
          <WorkoutHistory workouts={workouts} onDelete={handleDeleteWorkout} />
          <GoalTracker workouts={workouts} />
        </div>
      </div>
    </div>
  );
};

export default App;
