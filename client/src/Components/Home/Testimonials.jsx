import React from 'react';

const testimonials = [
    {
        id: 1,
        quote: "This platform revolutionized how we organize our community meetups. Attendance has doubled since we started using it!",
        attribution: "Sarah Johnson, Community Manager",
        role: "TechStart Inc."
    },
    {
        id: 2,
        quote: "As a small business owner, I've found this to be the most intuitive event management system I've ever used.",
        attribution: "Michael Chen",
        role: "Owner, Bean There Café"
    },
    {
        id: 3,
        quote: "The analytics and reporting features helped us understand our audience better and improve our events.",
        attribution: "David Rodriguez",
        role: "Event Coordinator, CreativeMinds"
    },
];

const Testimonials = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center mb-12">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                        Testimonials
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Trusted by event organizers worldwide
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                            <blockquote className="mb-4">
                                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                            </blockquote>
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                        {testimonial.attribution}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;