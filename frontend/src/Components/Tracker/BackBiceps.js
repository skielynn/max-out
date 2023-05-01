import React, { useState } from "react";
import ExerciseBox from "./ExerciseBox";

function BackBiceps() {
  const [exerciseBoxes, setExerciseBoxes] = useState([]);
  const exerciseList = [
    "Bicep curl log",
    "Bent-over row log",
    "Pull-up log",
    "Lat Pull-down log",
    "EZ Bar Bicep Curls",
    "we can add more here!!!",
  ];

  const handleAddBox = () => {
    setExerciseBoxes([
      ...exerciseBoxes,
      {
        id: exerciseBoxes.length,
        exerciseID: "",
        date: "",
        weight: "",
        sets: "",
        reps: "",
        logEntries: [],
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

  const handleSaveAllBoxes = (exerciseID, boxId) => {
    const boxToUpdate = exerciseBoxes.find((box) => box.id === boxId);

    const newLogEntry = {
      date: boxToUpdate.date,
      weight: boxToUpdate.weight,
      sets: boxToUpdate.sets,
      reps: boxToUpdate.reps,
      exerciseID: boxToUpdate.exerciseID,
    };

    boxToUpdate.logEntries.push(newLogEntry);

    setExerciseBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === boxId ? boxToUpdate : box))
    );
  };

  return (
    <div className="backBiceps">
      <h3>Back and Biceps</h3>
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
            onSaveLog={() => handleSaveAllBoxes(box.name, box.id)}
          />
          <div className="log">
            <h4>View Previous MAX-OUT Records Set</h4>
            <div className="logScroll">
              <select>
                <option value="bicepCurlLog">Bicep Curl Log</option>
                <option value="bentOverRowLog">Bent-over Row Log</option>
                <option value="pullUpLog">Pull-up Log</option>
                <option value="latPullDownLog">Lat Pull-down Log</option>
                <option value="ezBarBicepCurlsLog">EZ Bar Bicep Curls Log</option>
                <option value="we can add more here!!!">we can add more here!!!</option>
              </select>
            </div>
            {box.logEntries.length === 0 ? (
              <p>No entries in log.</p>
            ) : (
              <ul>
                {box.logEntries.map((entry, index) => (
                  <li key={index}>
                    <span>{entry.date.toLocaleString()}</span>
                    <span> - {entry.sets}x{entry.reps} {entry.exerciseID}</span>
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

export default BackBiceps;