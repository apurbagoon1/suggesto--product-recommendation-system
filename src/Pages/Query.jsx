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
                    <span className="inline-flex items-center gap-1 bg-yellow-100 capitalize text-yellow-500 px-2 py-1 rounded-full">
                        {ProductName}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-500 px-3 py-1 rounded-full">
                        {ProductBrand}
                    </span>
                </div>

                <h2 className="text-xl font-semibold mt-4 text-orange-400">
                    {QueryTitle.split(' ').slice(0, 5).join(' ')}...
                </h2>

                <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <FaUser /> Added by {userName}
                </div>
            </div>
        </div>
    );
};

export default Query;