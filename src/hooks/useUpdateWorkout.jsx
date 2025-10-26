import { useUserContext } from "../hooks/useUserContext"

export const useUpdateWorkout = () => {
    const { user } = useUserContext();

    const updateWorkoutRequest = async (id, workout, setError, setEmptyFields) => {
        try {
            const response = await fetch('https://workout-app-backend-7isx.onrender.com/api/workouts/' + id, {
                method: 'PATCH',
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
                console.log('Workout Updated:', json);
                // clear the form
                setEmptyFields([]);
                setError(null);
                console.log("Data updated successfully");
            }
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again later.");
        }
    }
    return { updateWorkoutRequest };
}
