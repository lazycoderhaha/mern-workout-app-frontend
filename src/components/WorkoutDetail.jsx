import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateWorkout } from '../hooks/useUpdateWorkout';
import { useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';


const WorkoutDetail = () => {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState(0);
    const [reps, setReps] = useState(0);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const navigate = useNavigate();

    const { updateWorkoutRequest } = useUpdateWorkout();
    const { user } = useUserContext();

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('https://workout-app-backend-7isx.onrender.com/api/workouts/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                console.log(json);
                setTitle(json.title);
                setLoad(json.load);
                setReps(json.reps);
            }
        }
        fetchWorkout()
    }, [id]);

    const updateWorkoutForm = async (e) => {
        e.preventDefault();
        const workout = { title, load, reps };
        await updateWorkoutRequest(id, workout, setError, setEmptyFields);
        navigate('/');

    }


    return (
        <div>
            <form action="" method="post" onSubmit={updateWorkoutForm}>
                <h3>Update a Workout</h3>
                <label htmlFor="title">Exercise Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label htmlFor="load">Load (in kg):</label>
                <input
                    type="number"
                    id="load"
                    name="load"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className={emptyFields.includes('load') ? 'error' : ''}
                />

                <label htmlFor="reps">Number of Reps:</label>
                <input
                    type="number"
                    id="reps"
                    name="reps"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    className={emptyFields.includes('reps') ? 'error' : ''}
                />

                <button type="submit">Update Workout</button>
            </form>

            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default WorkoutDetail