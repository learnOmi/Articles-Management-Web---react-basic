import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from 'views/Login';
import Layout from 'views/Layout';
import Home from './views/Home';
import '@ant-design/v5-patch-for-react-19';

function App() {
  return (
    <Router>
      <div>
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/layout">Layout</Link>
          </li>
        </ul>
        <hr /> */}

        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/layout" element={<Layout/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
