import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const isAuthenticated = true;

    return (
        <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Discover & Create Amazing Events
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of events or host your own. Connect with people who share your interests.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-center transition duration-300"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg font-semibold text-center transition duration-300"
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/events"
                                    className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-center transition duration-300"
                                >
                                    Browse Events
                                </Link>
                                <Link
                                    to="/add-event"
                                    className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg font-semibold text-center transition duration-300"
                                >
                                    Create Event
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                        alt="People at an event"
                        className="w-full max-w-md"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;