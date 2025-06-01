import { hasToken } from "./storage";
import { Navigate, useLocation } from "react-router-dom";

export function AuthRoute({children}) {
    const location = useLocation();
    if(hasToken()) { 
        return children;
    }else{
        return <Navigate to='/login' 
        state={{from:location.pathname}} 
        replace/>
    }

}  