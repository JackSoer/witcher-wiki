import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FilterContextProvider } from '../src/context/FilterContext';
import { ArticlesContextProvider } from './context/ArticlesContext';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ArticlesContextProvider>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </ArticlesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
