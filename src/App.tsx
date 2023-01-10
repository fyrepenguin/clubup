import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ClubPage from './pages/club';
import HomePage from './pages/home';
//import { loader as clubLoader } from './components/SearchAndFilter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/club/:clubId',
    element: <ClubPage />,
  },
  {
    path: '/:q',
    element: <HomePage />,
    // loader: clubLoader,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
