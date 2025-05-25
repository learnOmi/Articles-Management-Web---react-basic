import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={createBrowserRouter(routes,{window: window,history:customhistory})}>     */}
      <App />
    {/* </RouterProvider> */}
  </React.StrictMode>
);
