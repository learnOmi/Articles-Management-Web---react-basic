import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={createBrowserRouter(routes,{window: window,history:customhistory})}>     */}
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
    {/* </RouterProvider> */}
  </React.StrictMode>
);
