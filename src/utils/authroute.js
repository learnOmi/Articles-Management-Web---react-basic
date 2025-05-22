import { hasToken } from "./storage";
import { Navigate, useLocation } from "react-router-dom";

export function AuthRoute({children}) {
    const location = useLocation();
    // 如果有token，返回子组件，没有token，跳转到登录页
    if(hasToken()) {
        return children;
    }else{
        // 获取当前路由的路径
        return <Navigate to='/login' 
                state={{from:location.pathname}} 
                replace/>
    }

}