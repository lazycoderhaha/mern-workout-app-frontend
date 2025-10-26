import { useUserContext } from "./useUserContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
    const { dispatch } = useUserContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext();
    const logout = () => {
        // logout logic here
        localStorage.removeItem('user');
        localStorage.removeItem('workouts');
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
        dispatch({ type: 'LOGOUT' });
    }

    return { logout };
}
