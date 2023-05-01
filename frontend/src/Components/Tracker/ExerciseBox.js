import React, { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'

function ExerciseBox({ exerciseBox, exerciseID, onDelete, onSaveLog }) {
  /*const [name, setName] = useState(exerciseBox.name);
  const [date, setDate] = useState(exerciseBox.date);
  const [weight, setWeight] = useState(exerciseBox.weight);
  const [sets, setSets] = useState(exerciseBox.sets);
  const [reps, setReps] = useState(exerciseBox.reps);*/
  const [logAdded, setLogAdded] = useState(false);

  useEffect(() => {
    if (logAdded) {
      onSaveLog();
      setLogAdded(false);
    }
  }, [logAdded, onSaveLog]);

  /*const handleNameChange = (event) => {
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
  };*/

  /*const handleSave = () => {
    onSave({
      ...exerciseBox,
      name,
      date,
      weight,
      sets,
      reps,
    });
    setLogAdded(true);
  };*/

  const handleDelete = () => {
    onDelete(exerciseBox.id);
  };
  const navigate = useNavigate()
                                ///////////////    USE STATE FOR SIGN UP    ////////////////
const [exercise, setExercise] = useState({
       exercise_date: '',
       exercise_name: '',
       reps: '',
       weight: '',
       sets:''
       })
                              
                                                            ///////////// HANDLE SUBMIT FOR SIGN UP /////////////////////
const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token')
      console.log(exercise)
      navigate('/');

      
      const response = await fetch('http://localhost:5000/newworkout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(exercise)
              });
                                 
              console.log(response)
              return response.json
                                  
               }

  return (
    <div className="exerciseBox">
      <label>
        Name:
        <select value={exerciseID}>
          <option value="Bicep curl">Bicep curl</option>
          <option value="Bent-over row">Bent-over row</option>
          <option value="Pull-up">Pull-up</option>
          <option value="Lat Pull-down">Lat Pull-down</option>
          <option value="EZ Bar Bicep Curls">EZ Bar Bicep Curls</option>
        </select>
      </label>
      <label>
        Date:
        <input type="date" value={exercise.exercise_date} onChange = {e=> setExercise({...exercise, exercise_date: e.target.value})} />
      </label>
      <label>
        Weight:
        <input type="text" value={exercise.weight} onChange = {e=> setExercise({...exercise, weight: e.target.value})} />
      </label>
      <label>
        sets:
        <input type="text" value={exercise.sets} onChange = {e=> setExercise({...exercise, sets: e.target.value})}  />
      </label>
      <label>
        Reps:
        <input type="text" value={exercise.reps} onChange = {e=> setExercise({...exercise, reps: e.target.value})}  />
      </label>
      <button onClick={handleSubmit}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}


export default ExerciseBox;
