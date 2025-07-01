import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Events from "../Pages/Events/Events";
import AddEvent from "../Pages/AddEvent/AddEvent";
import MyEvents from "../Pages/MyEvents/MyEvents";

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
            {
                path: '/add-event',
                element: <AddEvent />
            },
            {
                path: '/my-events',
                element: <MyEvents />
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