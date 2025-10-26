import { useEffect, useState } from "react"
import SingleWorkout from "../components/SingleWorkout.jsx"
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import { useUserContext } from "../hooks/useUserContext.jsx"

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useUserContext();


    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!user) {
                return;
            }
            const response = await fetch('https://workout-app-backend-7isx.onrender.com/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        }
        fetchWorkouts()

    }, [dispatch, user])

    return (
        <div className='home'>
            <div className="workouts">
                {
                    workouts && workouts.map((workout) => {
                        return <SingleWorkout key={workout._id} workout={workout} />
                    })
                }
            </div>
            <WorkoutForm />

        </div>
    )
}

export default Home