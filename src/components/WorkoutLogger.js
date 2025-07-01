import { useState } from 'react';

const WorkoutLogger = ({ onAddWorkout }) => {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity && duration) {
      onAddWorkout({ activity, duration, date: new Date().toISOString() });
      setActivity('');
      setDuration('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Add New Workout</h4>
      <input
        className="form-control mb-2"
        placeholder="Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Duration (mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        type="number"
      />
      <button className="btn btn-primary">Add Workout</button>
    </form>
  );
};

export default WorkoutLogger;
