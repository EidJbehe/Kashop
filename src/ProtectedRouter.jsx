import { Navigate } from "react-router-dom";
import useAuthStore from "./assets/store/AuthStore";


export default function ProtectedRouter({ children }) { 

    const token = useAuthStore((state) => state.token);
    if (!token) { 
        return <Navigate to="/login" replace />;
    }
    return children;


}