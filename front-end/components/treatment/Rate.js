import { useState } from 'react';
import { useAtom } from 'jotai'
import { userTypeAtom, userIdAtom } from '../Layout';

const Rate = ({treatmentId}) => {
    const [userType] = useAtom(userTypeAtom);
    const [rating, setRating] = useState(0);
    const [userId] = useAtom(userIdAtom); 

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };


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
              } else if (response.status == 400) {
                // show response accordingly
                console.log('already voted')
              }
            } catch (error) {
              //error
              console.error('Error submitting rate:', error);
            }
        } else if (userType == 'patient'){
            console.log('TODO: patients rate')
        };

    };
    return (
        <div>
            <h2>Satisfaction Rate</h2>
            <label htmlFor="rating">Rating:</label>
            <select id="rating" value={rating} onChange={handleRatingChange}>
                <option value={0}>Select Rating</option>
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
