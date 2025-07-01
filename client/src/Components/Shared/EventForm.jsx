import React from 'react';
import { useForm } from 'react-hook-form';

const EventForm = ({
    onSubmit,
    isSubmitting,
    onCancel,
    initialValues = {
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendeeCount: 0
    }
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        defaultValues: initialValues
    });

    const handleFormSubmit = async (data) => {
        const eventDateTime = new Date(`${data.date}T${data.time}`);
        const now = new Date();

        if (eventDateTime <= now) {
            setError('date', {
                type: 'manual',
                message: 'Event date/time must be in the future'
            });
            return;
        }

        const eventData = {
            ...data,
            date: eventDateTime
        };

        await onSubmit(eventData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Event Title *
                </label>
                <div className="mt-1">
                    <input
                        id="title"
                        type="text"
                        {...register('title', { required: 'Event title is required' })}
                        className={`block w-full px-4 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Enter event title"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                </label>
                <div className="mt-1">
                    <textarea
                        id="description"
                        rows={4}
                        {...register('description', { required: 'Description is required' })}
                        className={`block w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Tell people what your event is about..."
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location *
                    </label>
                    <div className="mt-1">
                        <input
                            id="location"
                            type="text"
                            {...register('location', { required: 'Location is required' })}
                            className={`block w-full px-4 py-2 border ${errors.location ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="Where is your event?"
                        />
                        {errors.location && (
                            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="attendeeCount" className="block text-sm font-medium text-gray-700">
                        Expected Attendees
                    </label>
                    <div className="mt-1">
                        <input
                            id="attendeeCount"
                            type="number"
                            min="0"
                            {...register('attendeeCount', {
                                valueAsNumber: true,
                                min: { value: 0, message: 'Must be positive' }
                            })}
                            className={`block w-full px-4 py-2 border ${errors.attendeeCount ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.attendeeCount && (
                            <p className="mt-1 text-sm text-red-600">{errors.attendeeCount.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date *
                    </label>
                    <div className="mt-1">
                        <input
                            id="date"
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            {...register('date', { required: 'Date is required' })}
                            className={`block w-full px-4 py-2 border ${errors.date ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.date && (
                            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time *
                    </label>
                    <div className="mt-1">
                        <input
                            id="time"
                            type="time"
                            {...register('time', { required: 'Time is required' })}
                            className={`block w-full px-4 py-2 border ${errors.time ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.time && (
                            <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            {initialValues._id ? 'Updating...' : 'Creating...'}
                        </>
                    ) : (
                        initialValues._id ? 'Update Event' : 'Create Event'
                    )}
                </button>
            </div>
        </form>
    );
};

export default EventForm;