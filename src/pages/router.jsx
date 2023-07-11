import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from './layouts/Main';
import { lazy, useContext, Suspense } from 'react';
import AuthContext from '../context/AuthContext';
import Loading from '../components/loading/Loading';

// import Home from './home/Home';
// import Characters from './characters/Characters';
// import Locations from './locations/Locations';
// import Bestiary from './bestiary/Bestiary';
// import Article from './article/Article';
// import Login from './login/Login';
// import Register from './register/Register';
// import AddArticle from './addArticle/AddArticle';
// import MyArticles from './myArticles/MyArticles';
// import EditArticle from './editArticle/EditArticle';
// import SuggestedArticles from './suggestedArticles/SuggestedArticles';

const Home = lazy(() => import('./home/Home'));
const Characters = lazy(() => import('./characters/Characters'));
const Locations = lazy(() => import('./locations/Locations'));
const Bestiary = lazy(() => import('./bestiary/Bestiary'));
const Article = lazy(() => import('./article/Article'));
const Login = lazy(() => import('./login/Login'));
const Register = lazy(() => import('./register/Register'));
const AddArticle = lazy(() => import('./addArticle/AddArticle'));
const MyArticles = lazy(() => import('./myArticles/MyArticles'));
const EditArticle = lazy(() => import('./editArticle/EditArticle'));
const SuggestedArticles = lazy(() =>
  import('./suggestedArticles/SuggestedArticles')
);

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
        element: (
          <Suspense fallback={<Loading />}>
            <Characters />
          </Suspense>
        ),
      },
      {
        path: '/locations',
        element: (
          <Suspense fallback={<Loading />}>
            <Locations />
          </Suspense>
        ),
      },
      {
        path: '/bestiary',
        element: (
          <Suspense fallback={<Loading />}>
            <Bestiary />
          </Suspense>
        ),
      },
      {
        path: '/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: '/add-article',
        element: (
          <AuthRequire>
            <Suspense fallback={<Loading />}>
              <AddArticle />
            </Suspense>
          </AuthRequire>
        ),
      },
      {
        path: '/my-articles',
        element: (
          <AuthRequire>
            <Suspense fallback={<Loading />}>
              <MyArticles />
            </Suspense>
          </AuthRequire>
        ),
      },
      {
        path: '/edit-article/:id',
        element: (
          <AuthRequire>
            <Suspense fallback={<Loading />}>
              <EditArticle />
            </Suspense>
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
            <Suspense fallback={<Loading />}>
              <SuggestedArticles />
            </Suspense>
          </AdminRequire>
        ),
      },
      {
        path: '/suggested-articles/:id',
        element: (
          <AdminRequire>
            <Suspense fallback={<Loading />}>
              <Article />
            </Suspense>
          </AdminRequire>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
  },
]);

export default router;
