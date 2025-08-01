import React from 'react';
import { Link } from 'react-router';
import { FaUser } from 'react-icons/fa';

const Query = ({ query }) => {
    const {
        _id,
        ProductName,
        ProductBrand,
        ProductImage,
        QueryTitle,
        userName,
    } = query;

    return (
        <div className="bg-white/80 rounded-md shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
            <img
                src={ProductImage}
                alt={ProductName}
                className="w-full h-64 object-cover"
            />

            <div className="p-4 space-y-2">

                <div className="flex justify-between text-sm text-gray-800 gap-2">
                    <span className="inline-flex items-center gap-1 bg-yellow-200/50 capitalize text-yellow-600 px-3 py-1 rounded-full">
                        {ProductName}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-orange-200/50 text-orange-600 px-3 py-1 rounded-full">
                        {ProductBrand}
                    </span>
                </div>

                <h2 className="text-xl font-semibold mt-4 text-orange-500/80">
                    {QueryTitle}
                </h2>

                <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <FaUser /> Added by {userName}
                </div>

                <div className="pt-3">
                    <Link
                        to={`/queryDetails/${_id}`}
                        className="inline-block text-center w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-3xl font-medium tracking-wide hover:opacity-80"
                    >
                        Query Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Query;