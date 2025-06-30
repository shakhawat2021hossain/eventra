import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Events from "../Pages/Events/Events";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/events',
                element: <Events />
            },

        ]

    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
])