import { useState } from "react";
import config from "@/src/config";
// import { useAtom } from 'jotai'
// import { userIdAtom } from '../Layout';

const Rate = ({ therapistId, patientId, onRateSubmitted }) => {
  // const [userType] = useAtom(userTypeAtom);
  const [rating, setRating] = useState(0);
  // const [patientId] = useAtom(userIdAtom);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  // patients shouldn't rate if not assigned

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/therapist/satisfactionRate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            therapistId,
            patientId,
          }),
        }
      );

      if (response.ok) {
        // Show success message
        // Call the onRateSubmitted callback to trigger the update in the parent component
        onRateSubmitted();
      } else if (response.status == 400) {
        // show response accordingly
        console.log("already voted");
      }
    } catch (error) {
      //error
      console.error("Error submitting rate:", error);
    }
  };
  return (
    <div>
      <h2>Satisfaction Rate</h2>
      <label htmlFor="rating">Rating:</label>
      <select
        className=" bg-transparent"
        id="rating"
        value={rating}
        onChange={handleRatingChange}
      >
        <option className=" bg-gray-600" value={0}>
          Select Rating
        </option>
        <option className=" bg-gray-600" value={1}>
          1
        </option>
        <option className=" bg-gray-600" value={2}>
          2
        </option>
        <option className=" bg-gray-600" value={3}>
          3
        </option>
        <option className=" bg-gray-600" value={4}>
          4
        </option>
        <option className=" bg-gray-600" value={5}>
          5
        </option>
      </select>
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className=" mx-4 rounded-full bg-indigo-500 p-2 px-2 text-white hover:bg-orange-500 hover:cursor-pointer"
      >
        Submit Rate
      </button>
    </div>
  );
};

export default Rate;
