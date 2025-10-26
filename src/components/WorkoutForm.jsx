import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.jsx';
import { useUserContext } from '../hooks/useUserContext.jsx';

const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState(0);
    const [reps, setReps] = useState(0);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const { dispatch } = useWorkoutsContext();

    const { user } = useUserContext();


    const workoutForm = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in to add a workout");
            return;
        }

        const workout = { title, load, reps };

        try {
            const response = await fetch('https://workout-app-backend-7isx.onrender.com/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }

            })
            const json = await response.json()
            if (!response.ok) {
                setEmptyFields(json.emptyFields || []);
                setError(json.error);
            }
            if (response.ok) {
                console.log('New Workout Added:', json);

                // clear the form
                setTitle('');
                setLoad(0);
                setReps(0);
                setEmptyFields([]);
                setError(null);

                dispatch({ type: 'ADD_WORKOUT', payload: json })

            }


        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again later.");

        }


    }



    return (
        <div>
            <form action="" method="post" onSubmit={workoutForm}>
                <h3>Add a New Workout</h3>
                <label htmlFor="title">Exercise Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error' : ''} />

                <label htmlFor="load">Load (in kg):</label>
                <input type="number" id="load" name="load" value={load} onChange={(e) => setLoad(e.target.value)} className={emptyFields.includes('load') ? 'error' : ''} />

                <label htmlFor="reps">Number of Reps:</label>
                <input type="number" id="reps" name="reps" value={reps} onChange={(e) => setReps(e.target.value)} className={emptyFields.includes('reps') ? 'error' : ''} />

                <button type="submit">Add Workout</button>
            </form>

            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default WorkoutForm