import { useState } from "react";
import config from "@/src/config";
// import { useAtom } from 'jotai'
// import { userIdAtom } from '../Layout';
import PopUp from "../page/PopUp";

const Rate = ({ therapistId, patientId, onRateSubmitted }) => {
  // const [userType] = useAtom(userTypeAtom);
  const [rating, setRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupThanks, setShowPopupThanks] = useState(false);
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
        setShowPopupThanks(true);
      } else if (response.status == 400) {
        // show response accordingly
        setShowPopup(true);
        console.log("already voted this therapist!");
      }
    } catch (error) {
      //error
      console.error("Error submitting rate:", error);
    }
  };
  return (
    <div
      onClick={() => {
        if (showPopup || showPopupThanks) {
          setShowPopupThanks(false);
          setShowPopup(false);
        }
      }}
    >
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
      {showPopup && <PopUp message={"You already voted for your therapist!"} />}
      {showPopupThanks && (
        <PopUp message={"Thank you for rating your therapist!"} />
      )}
    </div>
  );
};

export default Rate;
