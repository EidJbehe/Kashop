import { createContext, useState } from "react";


 const AuthContext = createContext();


export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const logout = () => {
      localStorage.removeItem('token');
      setToken(null);
    };
    const setAccessToken = (token) => {
      localStorage.setItem('token', token);
      setToken(token);
    };

    return (
      <AuthContext.Provider value={{ token, setToken, logout, setAccessToken }}>
        {children}
      </AuthContext.Provider>
    );
    
};
export default AuthContext;


