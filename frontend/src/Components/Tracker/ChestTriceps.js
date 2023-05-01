import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'

export default function ChestTriceps() {

  const [exercise_name, setexercise_name] = useState('');
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [exercise, setExercise] = useState({
    exercise_date: '',
    exercise_name: '',
    reps: '',
    weight: '',
    sets: ''
  })

  useEffect(() => {
    console.log(exercise_name)
    if (exercise_name) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:5000/exercise-logs/${exercise_name}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
        //body: JSON.stringify({ exercise_name })
      })
        .then(response => response.json())
        .then(data => setExerciseLogs(data.logs))
        .catch(error => console.error(error));
    }
  }, [exercise_name]);

  function handleExerciseSelect(event) {
    setexercise_name(event.target.value);
  }

  const navigate = useNavigate()

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
    <><div className="exerciseBox">
    <label>
      Name:
      <select value={exercise.exercise_name} onChange={e => setExercise({ ...exercise, exercise_name: e.target.value })}>
        <option value="dbFly">DB-Fly</option>
        <option value="pushUps">Push-Ups</option>
        <option value="cableCrossover">Cable-Crossover</option>
        <option value="overheadExnts">Overhead-Exnts</option>
        <option value="benchPress">Bench-Press</option>
      </select>
    </label>
    <label>
      Date:
      <input type="date" value={exercise.exercise_date} onChange={e => setExercise({ ...exercise, exercise_date: e.target.value })} />
    </label>
    <label>
      Weight:
      <input type="text" value={exercise.weight} onChange={e => setExercise({ ...exercise, weight: e.target.value })} />
    </label>
    <label>
      sets:
      <input type="text" value={exercise.sets} onChange={e => setExercise({ ...exercise, sets: e.target.value })} />
    </label>
    <label>
      Reps:
      <input type="text" value={exercise.reps} onChange={e => setExercise({ ...exercise, reps: e.target.value })} />
    </label>
    <button onClick={handleSubmit}>Save</button>

  </div>
  
    <div className="log">
      <h4>View Previous MAX-OUT Records Set</h4>
      <div className="logScroll">
        <select value={exercise_name} onChange={handleExerciseSelect}>
          <option value="dbFly">DB-Fly</option>
          <option value="pushUps">Push-Ups</option>
          <option value="cableCrossover">Cable-Crossover</option>
          <option value="overheadExnts">Overhead-Extns</option>
          <option value="benchPress">Bench-Press</option>
        </select>
      </div>
      {exercise_name.length > 0 && exerciseLogs.length > 0 && (
        <div>
          <h2>{exercise_name}</h2>
          <ul>
            {exerciseLogs.map(log => (
              <li key={log.exercise_date}>
                Date:{log.exercise_date} Reps: {log.reps}, Weight: {log.weight}, Sets: {log.sets}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div></>
  /* </div>)*/
)
}

