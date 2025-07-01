const GoalTracker = ({ workouts }) => {
  const total = workouts.reduce((sum, w) => sum + parseInt(w.duration, 10), 0);
  return (
    <div className="mt-4">
      <h4>Goal Tracker</h4>
      <p>
        Total workout time: <strong>{total}</strong> mins
      </p>
    </div>
  );
};

export default GoalTracker;
