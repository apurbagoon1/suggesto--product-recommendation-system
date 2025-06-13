import React from 'react';
import Slider from '../Components/Slider';
import { useLoaderData, useNavigate } from 'react-router';
import Query from './Query';

const Home = () => {
    const queries = useLoaderData();
    const navigate = useNavigate();
    const recentQueries = queries.slice(-6).reverse();
    return (
        <div>
            <Slider></Slider>
            <div className="max-w-7xl mx-auto px-4 py-10 md:py-12 lg:py-16 text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-orange-500 mb-4 logo-text tracking-wide">
                    Explore Recent Queries
                </h1>
                <p className="md:text-xl mb-10 tracking-wider">
                    Discover recent product concerns, alternatives, and user recommendations—all in one place.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentQueries.map(query => (
                        <Query key={query._id} query={query} />
                    ))}
                </div>
                <button
                    onClick={() => navigate('/allPlants')}
                    className="mt-12 px-8 py-3 text-sm md:text-base hover:bg-gradient-to-bl from-yellow-500 to-orange-500 hover:text-white uppercase tracking-wider font-bold rounded-3xl hover:scale-105 transition-transform cursor-pointer"
                >
                    View All Plants
                </button>
            </div>
        </div>
    );
};

export default Home;