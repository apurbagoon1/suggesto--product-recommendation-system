import React from 'react';
import { useNavigate } from 'react-router';
import Cover from '../Components/Cover';

const MyQueries = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/addQuery');
    };

    return (
        <div>
            <Cover title="Your Product Concerns" highlighted="MY QUERIES" current="My Queries" />
            <div className="bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 p-8 text-center shadow-lg mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 pacifico-regular">
                    Ready to Share Your Experience?
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                    Add your product concerns and help others find better alternatives.
                </p>
                <button
                    onClick={handleNavigate}
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:bg-orange-600 uppercase text-white py-3 px-6 rounded-full font-semibold tracking-wide cursor-pointer transition duration-300 shadow-md hover:scale-105"
                >
                    Add Queries
                </button>
            </div>
        </div>

    );
};

export default MyQueries;