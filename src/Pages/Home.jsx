import React from 'react';
import Slider from '../Components/Slider';
import { useLoaderData, useNavigate } from 'react-router';
import Query from './Query';
import WhyBoycott from '../Components/WhyBoycott';
import TrustedAlternatives from '../Components/TrustedAlternatives';
import PromoSection from '../Components/PromoSection';
import BlogSection from '../Components/BlogSection';
import NewsletterSection from '../Components/NewsletterSection';

const Home = () => {
    const queries = useLoaderData();
    const navigate = useNavigate();
    const recentQueries = queries.slice(-6).reverse();
    return (
        <div>
            <Slider></Slider>
            <div className="max-w-7xl mx-auto px-4 py-10 md:py-12 lg:py-16 text-center">
                <h1 className="text-2xl md:text-4xl tracking-wider font-bold text-orange-500 mb-4">
                    Explore Recent Queries
                </h1>
                <p className="md:text-xl mb-10 tracking-wide">
                    Discover recent product concerns, alternatives, and user recommendations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentQueries.map(query => (
                        <Query key={query._id} query={query} />
                    ))}
                </div>
                <button
                    onClick={() => navigate('/allQueries')}
                    className="mt-12 px-5 py-2.5 text-sm md:text-base hover:bg-gradient-to-bl from-yellow-500 to-orange-500 hover:text-white uppercase tracking-wider font-bold rounded-lg hover:scale-105 transition-transform cursor-pointer"
                >
                    View All Queries
                </button>
            </div>
            <WhyBoycott></WhyBoycott>
            <TrustedAlternatives></TrustedAlternatives>
            <PromoSection></PromoSection>
            <BlogSection></BlogSection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;