import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

//Provider Component

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const fetchCurrentUser = async () => {
        try {
            const res = await axios.get('http://localhost:7777/loanpe/auth/me', {
                withCredentials: true,
            })
            setUser(res.data.user)
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        fetchCurrentUser()

    }, [])

    //login function
    const login = async (email, password) => {
        const res = await axios.post('http://localhost:7777/loanpe/auth/login',
            { email, password },
            { withCredentials: true }
        )

        setUser(res.data.user);
        return res.data.user.role;
    }

    //logout function
    const logout = async () => {
        await axios.post('http://localhost:7777/loanpe/auth/logout', {}, { withCredentials: true });
        setUser(null);
    };








    return (
        <AuthContext.Provider value={{user,loading,login,logout}}>

            {
                children
            }
        </AuthContext.Provider>
    )
}