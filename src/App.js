import '@ant-design/v5-patch-for-react-19';
import {HistoryRouter} from 'utils/history';
import { Routes,Route, Navigate } from 'react-router-dom';
import Login from 'views/Login';
import { history } from 'utils/history';
import Layout from 'views/Layout';
import Home from 'views/Home';
import Article from 'views/Article';
import ArticlePublish from 'views/ArticlePublish';
import { AuthRoute } from 'utils/authroute';

function App() {
  return (
    <>
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<Navigate to='/layout/home' />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/layout/*' element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='article' element={<Article />} />
            <Route path='article-publish' element={<ArticlePublish />} />
            <Route path='article-publish/:id' element={<ArticlePublish />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </>
  );
}

export default App;
