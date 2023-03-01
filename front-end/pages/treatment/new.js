import React, { useState } from 'react';

function New() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [diseaseTreatment, setDiseaseTreatment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/exercise/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          diseaseTreatment: [diseaseTreatment]
        })
      });

      if (response.ok) {
        console.log('Exercise created successfully');
      } else {
        console.log('Error creating exercise');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
      <h1>Create a new exercise</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="diseaseTreatment">Disease Treatment</label>
          <input
            type="text"
            id="diseaseTreatment"
            value={diseaseTreatment}
            onChange={(event) => setDiseaseTreatment(event.target.value)}
          />
        </div>
        <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
}

export default New;
