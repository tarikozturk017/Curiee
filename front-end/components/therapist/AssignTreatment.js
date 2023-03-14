import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import { useAtom } from 'jotai';
import { userIdAtom } from '../Layout';

const AssignTreatment = ({ patientId, setDisplayForm }) => {
  const [therapistId] = useAtom(userIdAtom);

  const [exerciseId, setExerciseId] = useState('');
  const [repetition, setRepetition] = useState(0);
  const [note, setNote] = useState('');
  const router = useRouter();

  const { data: exercises, error } = useSWR(`http://localhost:3001/exercise/all`, async (url) => {
    const res = await fetch(url)
    return res.json()
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    // setDisplayForm(false)

    try {
      const response = await fetch('http://localhost:3001/therapist/assignExerciseToPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId,
          therapistId,
          exerciseId,
          repetition,
          note,
        }),
      });

      if (response.ok && patientId) {
        // router.push(`/patient/${patientId}`);
        setDisplayForm(false)
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Failed to load!</div>
  if (!exercises) return <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>Loading...</div>

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="exerciseId">Select Exercise:</label>
      <select
        id="exerciseId"
        name="exerciseId"
        value={exerciseId}
        onChange={(event) => setExerciseId(event.target.value)}
        required
      >
        <option value="">Select an exercise</option>
        {exercises.map((exercise) => (
          <option key={exercise._id} value={exercise._id}>
            {exercise.title}
          </option>
        ))}
      </select>
      <br />

      <label htmlFor="repetition">Repetition:</label>
      <input
        type="number"
        id="repetition"
        name="repetition"
        value={repetition}
        onChange={(event) => setRepetition(Number(event.target.value))}
        required
      />
      <br />

      <label htmlFor="note">Note:</label>
      <textarea
        id="note"
        name="note"
        value={note}
        onChange={(event) => setNote(event.target.value.toString())}
      />
      <br />

      <button type="submit">Assign Treatment</button>
    </form>
  );
};

export default AssignTreatment;
