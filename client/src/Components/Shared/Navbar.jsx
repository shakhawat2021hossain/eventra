import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const {user, logout} = useAuth()
    console.log(user);

    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar px-4 max-w-7xl mx-auto">

               
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">Eventra</Link>
                </div>

                
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/events">Events</NavLink></li>
                        <li><NavLink to="/add-event">Add Event</NavLink></li>
                        <li><NavLink to="/my-events">My Event</NavLink></li>
                    </ul>
                </div>

                
                <div className="flex-none">
                    {!user ? (
                        <Link to="/login" className="btn btn-outline btn-sm">Sign In</Link>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.image || '/default-avatar.png'} alt="" />
                                </div>
                            </div>

                            <ul tabIndex={0} className="text-center mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-30">
                                <li className="font-semibold">{user?.name}</li>

                                
                                <div className="block lg:hidden">
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/events">Events</NavLink></li>
                                    <li><NavLink to="/add-event">Add Event</NavLink></li>
                                    <li><NavLink to="/my-events">My Event</NavLink></li>
                                </div>

                                <li className='mx-auto'><button className='text-md' onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;
