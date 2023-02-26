import React, { useState, useEffect } from 'react';

function ExploreTreatment() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await fetch('http://localhost:3001/exercises');
        const data = await response.json();

        if (response.ok) {
          setExercises(data);
        } else {
          console.log('Error fetching exercises');
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchExercises();
  }, []);

  return (
    <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
      <h1>Explore Treatment</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            <h2>{exercise.title}</h2>
            <p>{exercise.description}</p>
            <ul>
              {exercise.diseaseTreatment.map((treatment, index) => (
                <li key={index}>{treatment}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExploreTreatment;
