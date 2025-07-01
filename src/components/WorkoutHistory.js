import { useState } from 'react';

const WorkoutHistory = ({ workouts, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [editedActivity, setEditedActivity] = useState('');
  const [editedDuration, setEditedDuration] = useState('');

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/workouts/${id}`, {
      method: 'DELETE'
    })
      .then(() => onDelete(id))
      .catch((err) => console.error('Delete failed:', err));
  };

  const handleEdit = (workout) => {
    setEditId(workout.id);
    setEditedActivity(workout.activity);
    setEditedDuration(workout.duration);
  };

  const handleUpdate = (id) => {
    fetch(`http://localhost:3001/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        activity: editedActivity,
        duration: editedDuration,
        date: new Date().toISOString()
      })
    })
      .then(() => {
        setEditId(null);
        window.location.reload(); // simple way to refresh
      })
      .catch((err) => console.error('Update failed:', err));
  };

  return (
    <div>
      <h4>Workout History</h4>
      <ul className="list-group">
        {workouts.map((w) => (
          <li
            key={w.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editId === w.id ? (
              <div className="flex-grow-1 me-3">
                <input
                  value={editedActivity}
                  onChange={(e) => setEditedActivity(e.target.value)}
                  className="form-control mb-1"
                  placeholder="Activity"
                />
                <input
                  type="number"
                  value={editedDuration}
                  onChange={(e) => setEditedDuration(e.target.value)}
                  className="form-control"
                  placeholder="Duration"
                />
              </div>
            ) : (
              <span>
                {w.date.slice(0, 10)} - {w.activity} for {w.duration} mins
              </span>
            )}

            <div className="btn-group">
              {editId === w.id ? (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleUpdate(w.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(w)}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-sm btn-danger ms-2"
                onClick={() => handleDelete(w.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutHistory;
