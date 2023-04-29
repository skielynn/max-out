import React, { useState, useEffect } from "react";

function ExerciseBox({ exerciseBox, onSave, onDelete, onSaveLog }) {
  const [name, setName] = useState(exerciseBox.name);
  const [date, setDate] = useState(exerciseBox.date);
  const [weight, setWeight] = useState(exerciseBox.weight);
  const [sets, setSets] = useState(exerciseBox.sets);
  const [reps, setReps] = useState(exerciseBox.reps);
  const [logAdded, setLogAdded] = useState(false);

  useEffect(() => {
    if (logAdded) {
      onSaveLog();
      setLogAdded(false);
    }
  }, [logAdded, onSaveLog]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleSetsChange = (event) => {
    setSets(event.target.value);
  };

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleSave = () => {
    onSave({
      ...exerciseBox,
      name,
      date,
      weight,
      sets,
      reps,
    });
    setLogAdded(true);
  };

  const handleDelete = () => {
    onDelete(exerciseBox.id);
  };

  return (
    <div className="exerciseBox">
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <label>
        Weight:
        <input type="text" value={weight} onChange={handleWeightChange} />
      </label>
      <label>
        Sets:
        <input type="text" value={sets} onChange={handleSetsChange} />
      </label>
      <label>
        Reps:
        <input type="text" value={reps} onChange={handleRepsChange} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ExerciseBox;
