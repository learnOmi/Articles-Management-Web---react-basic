import {useNavigate} from 'react-router-dom';

// wrappedComp是一个高阶组件，用于将路由导航功能注入到组件中
export function wrappedComp (Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
