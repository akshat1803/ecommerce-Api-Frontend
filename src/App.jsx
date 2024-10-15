import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import './index.css';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',    
            element: <Register />, 
        },
        {
            path: '/login',  
            element: <Login />, 
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};  

export default App;
