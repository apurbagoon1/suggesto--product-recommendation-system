import React from 'react';
import { Link } from 'react-router'; 
import { FaArrowLeft } from 'react-icons/fa';
import errorImage from '../assets/Error-page.jpg';

const Error = () => {

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
            <div className="max-w-3xl w-full flex flex-col items-center text-center py-10">
                <img
                    src={errorImage}
                    alt="Error"
                    className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl mb-6"
                />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-base sm:text-lg text-orange-500 mb-6 px-4">
                    The page you’re trying to access doesn’t exist or may have been moved.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 py-2.5 px-6 sm:py-3 sm:px-8 bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-xl rounded-full text-base sm:text-lg font-semibold tracking-wide transition duration-300 hover:opacity-90"
                >
                    <FaArrowLeft /> Go Home
                </Link>
            </div>
        </div>
    );
};

export default Error;