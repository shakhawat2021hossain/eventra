import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import UpdateModal from '../../Components/Modals/UpdateModal';
import EventForm from '../../Components/Shared/EventForm';

const MyEvents = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    // Fetch user's events
    const { data: myEvents = [], isLoading, refetch } = useQuery({
        queryKey: ["my-events"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/my-events');
            return data.events;
        },
    });

    // Delete event mutation
    const { mutate: deleteEvent } = useMutation({
        mutationFn: async (eventId) => {
            await axiosSecure.delete(`/events/${eventId}`);
        },
        onSuccess: () => {
            toast.success('Event deleted successfully');
            refetch();
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to delete event');
        }
    });

    // Update event mutation
    const { mutate: updateEvent, isPending: isUpdating } = useMutation({
        mutationFn: async ({ eventId, updatedData }) => {
            const { data } = await axiosSecure.patch(`/events/${eventId}`, updatedData);
            return data;
        },
        onSuccess: () => {
            toast.success('Event updated successfully');
            refetch();
            setIsModalOpen(false);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to update event');
        }
    });

    const handleDelete = (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent(eventId);
        }
    };

    const handleUpdate = (event) => {
        // Convert the date back to format expected by the form
        const eventForForm = {
            ...event,
            date: format(new Date(event.date), 'yyyy-MM-dd'),
            time: format(new Date(event.date), 'HH:mm')
        };
        setCurrentEvent(eventForForm);
        setIsModalOpen(true);
    };

    const handleSubmitUpdate = async (updatedData) => {
        updateEvent({
            eventId: currentEvent._id,
            updatedData
        });
    };

    if (!isLoading && myEvents.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">My Events</h2>
                    <p className="text-lg text-gray-600 mb-8">You haven't created any events yet.</p>
                    <button
                        onClick={() => navigate('/add-event')}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Your First Event
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900">My Events</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Manage all the events you've created
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myEvents?.map((event) => (
                            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                            {format(new Date(event.date), 'MMMM d, yyyy')}
                                        </span>
                                        <span className="flex items-center text-gray-600 text-sm">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            {format(new Date(event.date), 'h:mm a')}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-gray-600">{event.location}</span>
                                        </div>
                                        <span className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                                            </svg>
                                            {event.attendeeCount} attending
                                        </span>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleUpdate(event)}
                                            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Update Event Modal */}
                <UpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Update Event</h3>
                        <EventForm
                            onSubmit={handleSubmitUpdate}
                            isSubmitting={isUpdating}
                            onCancel={() => setIsModalOpen(false)}
                            initialValues={currentEvent}
                        />
                    </div>
                </UpdateModal>
            </div>
        </div>
    );
};

export default MyEvents;