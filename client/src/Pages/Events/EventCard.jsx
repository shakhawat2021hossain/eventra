import React from 'react';
import { FaClock } from 'react-icons/fa';
import { MdGroups } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const EventCard = ({ event }) => {
    const { user } = useAuth
    const axiosSecure = useAxiosSecure()

    const handleJoin = async (eventId) => {
        try {
            const res = await axiosSecure.patch(`/events/${eventId}/join`);
            if (res.data?.result?.modifiedCount > 0) {
                toast.success('Joined successfully!');
                // refetch();
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {new Date(event.date).toLocaleDateString('en-CA')}
                    </span>
                    <span className="flex items-center text-gray-600 text-sm">
                        <FaClock className='mr-1' />
                        {event.time}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center mb-3">
                    <img
                        src={event.user?.image || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                        alt={event.user?.name}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-600">{event.user?.name || 'Alex Hales'}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <FaLocationDot className='mr-1' />
                        <span className="text-sm text-gray-600">{event.location}</span>
                    </div>
                    <span className="flex items-center text-sm text-gray-600">
                        <MdGroups className='mr-1 text-xl' />
                        {event.attendeeCount} attending
                    </span>
                </div>

                <button
                    onClick={() => handleJoin(event._id)}
                    disabled={event.attendees?.includes(user?._id)}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${event.attendees?.includes(user?._id)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    {event.attendees?.includes(user?._id) ? 'Already Joined' : 'Join Event'}
                </button>
            </div>
        </div>
    );
};

export default EventCard;