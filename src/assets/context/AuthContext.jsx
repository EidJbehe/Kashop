import { createContext, useState } from "react";


const AuthContext = createContext();


export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const logout = () => {
      localStorage.removeItem('token');
      setToken(null);
    };
    const setAcsessToken = (token) => { 
        localStorage.setItem('token', token);
    }

    return (
      <AuthContext.Provider value={{ token, setToken, logout, setAcsessToken }}>
        {children}
      </AuthContext.Provider>
    );
    
};
export default AuthContext;


