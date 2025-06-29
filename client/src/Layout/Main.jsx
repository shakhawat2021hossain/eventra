import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Main;