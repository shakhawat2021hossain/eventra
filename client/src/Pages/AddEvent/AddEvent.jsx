import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import EventForm from '../../Components/Shared/EventForm';

const AddEvent = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (event) => {
            const eventData = {
                ...event,
                user: { name: user?.name, image: user?.image, user_id: user?._id }
            };
            const { data } = await axiosPublic.post('/events', eventData);
            return data;
        },
        onSuccess: () => {
            toast.success("Successfully added an event");
            navigate('/events');
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to create event');
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create a New Event</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Fill out the form below to add your event to our platform.
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                    <EventForm
                        onSubmit={mutateAsync}
                        isSubmitting={isPending}
                        onCancel={() => navigate('/events')}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddEvent;