import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';




const Events = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');

    const axiosPublic = useAxiosPublic();
    const { data: events = [], isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/events');
            return data?.events;
        }
    });
    console.log(events);

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8 ">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h1>

                    {/* Search and Filter Section */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search events by title..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <select
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            >
                                <option value="all">All Dates</option>
                                <option value="today">Today</option>
                                <option value="thisWeek">This Week</option>
                                <option value="lastWeek">Last Week</option>
                                <option value="thisMonth">This Month</option>
                                <option value="lastMonth">Last Month</option>
                            </select>
                        </div>
                    </div>

                    {/* Events Grid */}
                    {events.length === 0 ? (
                        <div className="text-center py-12">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
                            <p className="mt-1 text-gray-500">
                                {searchTerm || dateFilter !== 'all'
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'There are currently no events scheduled'}
                            </p>
                            <div className="mt-6">
                                <Link
                                    to="/add-event"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg
                                        className="-ml-1 mr-2 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    Create New Event
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <EventCard key={event.title} event={event} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;