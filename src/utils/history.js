import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

// HistoryRouter 组件用于将 history 对象与 React Router 的 Router 组件结合起来
export const HistoryRouter = ({ history, children }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  //在 DOM 更新后同步执行，确保路由状态变化立即生效。
  React.useLayoutEffect(() => {
    // history 变化时调用 setState
    const unlisten = history.listen(setState);
    return () => {
      // 组件卸载时取消订阅
      unlisten();
    };
  }, [history]);

  // 渲染 Router 组件，并传递路由上下文
  // 传递子组件和导航器以及当前路由状态 (action 和 location)
  // 在 v6 中，底层 <Router> 组件没有 history 属性，而是通过 navigator 传递路由控制对象。
  return React.createElement(Router, Object.assign({ children, navigator: history }, state));
};