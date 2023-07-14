import { useState } from 'react';
import { useAtom } from 'jotai'
import { userTypeAtom, userIdAtom } from '../Layout';

const Rate = ({ treatmentId, onRateSubmitted }) => {
    const [userType] = useAtom(userTypeAtom);
    const [rating, setRating] = useState(0);
    const [userId] = useAtom(userIdAtom); 

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    // patients shouldn't rate if not assigned 

    const handleSubmit = async () => {
        if (userType == 'therapist') {
            try {
              const response = await fetch('http://localhost:3001/exercise/therapistRate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  rating,
                  userId,
                  treatmentId
                }),
              });
        
              if (response.ok) {
                // Show success message

                onRateSubmitted()
              } else if (response.status == 400) {
                // show response accordingly
                console.log('already voted')
              }
            } catch (error) {
              //error
              console.error('Error submitting rate:', error);
            }
        } else if (userType == 'patient'){
            try {
                const response = await fetch('http://localhost:3001/exercise/patientRate', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    rating,
                    userId,
                    treatmentId
                  }),
                });
          
                if (response.ok) {
                  // Show success message

                  onRateSubmitted()
                } else if (response.status == 400) {
                  // show response accordingly
                  console.log('already voted')
                }
              } catch (error) {
                //error
                console.error('Error submitting rate:', error);
              }
        };

    };
    return (
        <div>
            <h2 className=' font-bold text-lg mb-2'>Satisfaction Rate</h2>
            <label htmlFor="rating">Rating:</label>
            <select className=' bg-transparent' id="rating" value={rating} onChange={handleRatingChange}>
                <div><option value={0}>Select Rating</option></div>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <button onClick={handleSubmit} disabled={rating === 0}>
                Submit Rate
            </button>
        </div>
    )
}

export default Rate;
