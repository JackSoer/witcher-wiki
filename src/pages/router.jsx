import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';

import Home from './home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export default router;
