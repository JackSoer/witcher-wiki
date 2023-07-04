import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FilterContextProvider } from '../src/context/FilterContext';
import { ArticlesContextProvider } from './context/ArticlesContext';
import { AuthContextProvider } from './context/AuthContext';
import { WindowSizeProvider } from './context/WindowSizeContext';
import { SearchContextProvider } from './context/SearchContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WindowSizeProvider>
      <AuthContextProvider>
        <ArticlesContextProvider>
          <FilterContextProvider>
            <SearchContextProvider>
              <App />
            </SearchContextProvider>
          </FilterContextProvider>
        </ArticlesContextProvider>
      </AuthContextProvider>
    </WindowSizeProvider>
  </React.StrictMode>
);
