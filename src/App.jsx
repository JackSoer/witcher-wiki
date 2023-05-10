import { RouterProvider } from 'react-router-dom';
import router from './pages/router';
import '../Scss/reset.scss';
import '../Scss/general.scss';

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
