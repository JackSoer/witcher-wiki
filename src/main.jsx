import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FilterContextProvider } from '../src/context/FilterContext';
import { ArticlesContextProvider } from './context/ArticlesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ArticlesContextProvider>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </ArticlesContextProvider>
  </React.StrictMode>
);
