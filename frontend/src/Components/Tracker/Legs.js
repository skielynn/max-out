import React, { useState } from "react";
import ExerciseBox from "./ExerciseBox";

function Legs() {
  const [exerciseBoxes, setExerciseBoxes] = useState([]);

  const handleAddBox = () => {
    setExerciseBoxes([
      ...exerciseBoxes,
      {
        id: exerciseBoxes.length,
        name: "",
        date: "",
        weight: "",
        sets: "",
        reps: "",
        logEntries: [] // Add an empty array to hold log entries for each box
      },
    ]);
  };

  const handleDeleteBox = (boxId) => {
    setExerciseBoxes(exerciseBoxes.filter((box) => box.id !== boxId));
  };

  const handleSaveBox = (index, updatedBox) => {
    setExerciseBoxes((prevBoxes) => {
      const updatedBoxes = [...prevBoxes];
      updatedBoxes[index] = updatedBox;
      return updatedBoxes;
    });
  };

  const handleSaveAllBoxes = (name, boxId) => { // Pass boxId to identify the specific box
    // Get the box object for the specified boxId
    const boxToUpdate = exerciseBoxes.find((box) => box.id === boxId);

    // Create a new log entry for the box
    const newLogEntry = {
      date: boxToUpdate.date,
      weight: boxToUpdate.weight,
      sets: boxToUpdate.sets,
      reps: boxToUpdate.reps,
      name: boxToUpdate.name,
    };

    // Add the new log entry to the logEntries array for the box
    boxToUpdate.logEntries.push(newLogEntry);

    // Update the exerciseBoxes state with the modified box object
    setExerciseBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === boxId ? boxToUpdate : box))
    );
  };

  return (
    <div className="legs">
      <h3>Legs</h3>
      <button onClick={handleAddBox}>Add Exercise</button>
      {exerciseBoxes.map((box) => (
        <div key={box.id}>
          <ExerciseBox
            exerciseBox={box}
            onSave={(updatedBox) =>
              handleSaveBox(
                exerciseBoxes.findIndex((b) => b.id === box.id),
                updatedBox
              )
            }
            onDelete={handleDeleteBox}
            onSaveLog={() => handleSaveAllBoxes(box.name, box.id)} // Pass the boxId to the handler function
          />
          <div className="log">
            <h4>Log</h4>
            {box.logEntries.length === 0 ? ( // Show "No entries in log." message only for the specific box
              <p>No entries in log.</p>
            ) : (
              <ul>
                {box.logEntries.map((entry, index) => ( // Iterate over logEntries array for the specific box
                  <li key={index}>
                    <span>{entry.date.toLocaleString()}</span>
                    <span> - {entry.sets}x{entry.reps} {entry.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Legs;
