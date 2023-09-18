import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useAtom } from "jotai";
import { userIdAtom } from "../Layout";
import { Input, Textarea, Select, Option } from "@material-tailwind/react";
import config from "@/src/config";

const AssignTreatment = ({ patientId, setDisplayForm }) => {
  const [therapistId] = useAtom(userIdAtom);

  const [exerciseId, setExerciseId] = useState("");
  const [repetition, setRepetition] = useState();
  const [note, setNote] = useState("");
  const router = useRouter();

  const { data: exercises, error } = useSWR(
    `${config.apiBaseUrl}/exercise/all`,
    async (url) => {
      const res = await fetch(url);
      return res.json();
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    // setDisplayForm(false)

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/therapist/assignExerciseToPatient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            therapistId,
            exerciseId,
            repetition,
            note,
          }),
        }
      );

      if (response.ok && patientId) {
        // router.push(`/patient/${patientId}`);
        setDisplayForm(false);
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error)
    return (
      <div className=" mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center">
        Failed to load!
      </div>
    );
  if (!exercises)
    return (
      <div className=" mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center">
        Loading...
      </div>
    );

  return (
    <form className=" " onSubmit={handleSubmit}>
      <label htmlFor="exerciseId">Select Exercise:</label>
      <select
        className=" bg-inherit"
        id="exerciseId"
        name="exerciseId"
        value={exerciseId}
        onChange={(event) => setExerciseId(event.target.value)}
        required
      >
        <option disabled value="" className=" bg-gray-600">
          Select an exercise
        </option>
        {exercises.map((exercise) => (
          <option
            className=" bg-gray-600"
            key={exercise._id}
            value={exercise._id}
          >
            {exercise.title}
          </option>
        ))}
      </select>
      <br />

      <div className="flex flex-col w-52 lg:w-80 my-4 items-end gap-6 mx-auto">
        <Input
          size="md"
          label="Repetition"
          className=" text-blue-gray-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          id="repetition"
          name="repetition"
          value={repetition}
          onChange={(event) => setRepetition(Number(event.target.value))}
          required
        />
      </div>
      {/* <label htmlFor="repetition">Repetition:</label>
      <input
        className=" mb-5 w-24 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"

        type="number"
        id="repetition"
        name="repetition"
        value={repetition}
        onChange={(event) => setRepetition(Number(event.target.value))}
        required
      /> */}

      <div className="w-52 lg:w-80 mx-auto my-4">
        <Textarea
          className="text-blue-gray-200"
          label="Note"
          id="note"
          name="note"
          value={note}
          onChange={(event) => setNote(event.target.value.toString())}
        />
      </div>
      {/* <label htmlFor="note">Note:</label>
      <textarea
        className="w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"

        id="note"
        name="note"
        value={note}
        onChange={(event) => setNote(event.target.value.toString())}
      /> */}
      <br />

      <button
        className="rounded-full bg-green-600 p-2 px-8 text-white hover:bg-green-900 mx-auto mb-2"
        type="submit"
      >
        Assign Treatment
      </button>
    </form>
  );
};

export default AssignTreatment;
