import { createBrowserRouter } from 'react-router-dom';
import Main from './layouts/Main';

import Home from './home/Home';
import Characters from './characters/Characters';
import Locations from './locations/Locations';
import Bestiary from './bestiary/Bestiary';
import Article from './article/Article';
import Login from './login/Login';
import Register from './register/Register';
import AddArticle from './addArticle/AddArticle';
import MyArticles from './myArticles/MyArticles';
import EditArticle from './editArticle/EditArticle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/characters',
        element: <Characters />,
      },
      {
        path: '/locations',
        element: <Locations />,
      },
      {
        path: '/bestiary',
        element: <Bestiary />,
      },
      {
        path: '/:id',
        element: <Article />,
      },
      {
        path: '/add-article',
        element: <AddArticle />,
      },
      {
        path: '/my-articles',
        element: <MyArticles />,
      },
      {
        path: '/edit-article/:id',
        element: <EditArticle />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
