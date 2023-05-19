import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';

import Home from './home/Home';
import Characters from './characters/Characters';
import Locations from './locations/Locations';
import Bestiary from './bestiary/Bestiary';
import Article from './article/Article';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
    ],
  },
]);

export default router;
