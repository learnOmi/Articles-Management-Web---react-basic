import { hasToken } from "./storage";
import { Navigate, useLocation } from "react-router-dom";
import { message } from "antd";

export function AuthRoute({children}) {
    const location = useLocation();
    if(hasToken()) { 
        return children;
    }else{
        message.error('Without Token!');
        return <Navigate to='/login' 
        state={{from:location.pathname}} 
        replace/>
    }

}  