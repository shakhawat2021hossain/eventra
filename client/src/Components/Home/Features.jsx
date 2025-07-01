import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';

const features = [
    {
        name: 'Easy Event Creation',
        description: 'Create and manage your events in just a few clicks with our intuitive interface.',
        icon: FaCircleCheck,
    },
    {
        name: 'Smart Scheduling',
        description: 'Our system helps you find the perfect time and date for maximum attendance.',
        icon: FaCalendar,
    },
    {
        name: 'Community Building',
        description: 'Connect with like-minded people and grow your community through events.',
        icon: MdGroupAdd,
    },
];

const Features = () => {
    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                        Features
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        A better way to manage events
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Everything you need to create, manage, and grow your events in one platform.
                    </p>
                </div>

                <div className="mt-10">
                    <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-16">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {feature.name}
                                    </h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;