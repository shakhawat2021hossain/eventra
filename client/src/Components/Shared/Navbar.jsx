import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const user = {
        displayName: "Shanto",
        photoURL: "https://i.pravatar.cc/150?img=12"
    };

    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar px-4 max-w-7xl mx-auto">

                {/* Logo */}
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">Eventra</Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/events">Events</NavLink></li>
                        <li><NavLink to="/add-event">Add Event</NavLink></li>
                        <li><NavLink to="/my-events">My Event</NavLink></li>
                    </ul>
                </div>

                {/* Profile & Dropdown */}
                <div className="flex-none">
                    {!user ? (
                        <Link to="/signin" className="btn btn-outline btn-sm">Sign In</Link>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL || '/default-avatar.png'} alt="User" />
                                </div>
                            </div>

                            {/* Dropdown content */}
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li className="text-sm font-semibold">{user.displayName || 'User'}</li>

                                {/* Show routes inside dropdown on mobile only */}
                                <div className="block lg:hidden">
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/events">Events</NavLink></li>
                                    <li><NavLink to="/add-event">Add Event</NavLink></li>
                                    <li><NavLink to="/my-events">My Event</NavLink></li>
                                </div>

                                <li><button>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;
