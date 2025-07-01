import React from 'react';
import Hero from './Hero';
import Features from '../../Components/Home/Features';
import Testimonials from '../../Components/Home/Testimonials';

const Home = () => {
    return (
        <div>
            <Hero/>
            <Features/>
            <Testimonials/>
        </div>
    );
};

export default Home;