import Login  from 'views/Login';
import Layout from 'views/Layout';
import Home from 'views/Home';
import Article from 'views/Article';
import ArticlePublish from 'views/ArticlePublish';
import { AuthRoute } from 'utils/authroute';

const routes = [
  {path: '/', element: <Login />},
  {path: '/login', element: <Login />},
  {path: '/layout', element: <AuthRoute><Layout /></AuthRoute>, children: [
    {index:true, element: <Home />},
    {index:true, path: 'home', element: <Home />},
    {path: 'article', element: <Article />},
    {path: 'article-publish', element: <ArticlePublish />}, 
  ]}
];

export default routes;