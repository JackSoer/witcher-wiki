import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from './layouts/Main';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

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
import SuggestedArticles from './suggestedArticles/SuggestedArticles';

const AuthRequire = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

const AdminRequire = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser?.isAdmin) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

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
        element: (
          <AuthRequire>
            <AddArticle />
          </AuthRequire>
        ),
      },
      {
        path: '/my-articles',
        element: (
          <AuthRequire>
            <MyArticles />
          </AuthRequire>
        ),
      },
      {
        path: '/edit-article/:id',
        element: (
          <AuthRequire>
            <EditArticle />
          </AuthRequire>
        ),
      },
      {
        path: '/edit-article',
        element: <Navigate to="/" />,
      },
      {
        path: '/suggested-articles',
        element: (
          <AdminRequire>
            <SuggestedArticles />
          </AdminRequire>
        ),
      },
      {
        path: '/suggested-articles/:id',
        element: (
          <AdminRequire>
            <Article />
          </AdminRequire>
        ),
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
