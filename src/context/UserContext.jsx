import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext(null);


const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}


export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log("AuthContext State:", state);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            dispatch({ type: 'LOGIN', payload: JSON.parse(user) })
        }
    }, [])

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}
