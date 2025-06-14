import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IoIosHeart } from 'react-icons/io';
import Loading from './Loading';
import Cover from '../Components/Cover';

const AllQueries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const res = await fetch('http://localhost:5000/queries');
                const data = await res.json();
                const sortedQueries = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setQueries(sortedQueries);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching all queries:', err);
                setLoading(false);
            }
        };

        fetchQueries();
    }, []);

    const handleRecommendClick = (id) => {
        navigate(`/queryDetails/${id}`);
    };

    const formatTimeAgo = (date) => {
        const now = new Date();
        const posted = new Date(date);
        const seconds = Math.floor((now - posted) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };

        for (const key in intervals) {
            const value = Math.floor(seconds / intervals[key]);
            if (value >= 1) return `Added ${value} ${key}${value > 1 ? 's' : ''} ago`;
        }

        return 'Added just now';
    };

    if (loading) return <Loading />;

    return (
        <div>
            <Cover title="Explore Others' Thoughts" highlighted="ALL QUERIES" current="All Queries" />
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-10 pacifico-regular text-center">
                    Browse Public Concerns
                </h2>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {queries.map((query) => (
                        <div
                            key={query._id}
                            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition flex flex-col"
                        >
                            <img
                                src={query.ProductImage}
                                alt={query.ProductName}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-5 space-y-2 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-orange-500 text-center">
                                    {query.QueryTitle}
                                </h3>
                                <p className="text-sm text-gray-600 italic text-center">{formatTimeAgo(query.date)}</p>
                                <p className="text-gray-700 text-sm mb-3 text-justify">{query.BoycottReason.slice(0, 100)}...</p>

                                <div className="text-gray-700">
                                    <p><strong>Product:</strong> {query.ProductName}</p>
                                    <p><strong>Brand:</strong> {query.ProductBrand}</p>
                                    <p><strong>By:</strong> {query.userName}</p>
                                </div>

                                <div className="mt-auto pt-4 flex justify-between items-center">
                                    <p className="text-sm font-semibold text-orange-600">
                                        {query.recommendationCount || 0} Recommendation{query.recommendationCount > 1 ? 's' : ''}
                                    </p>
                                    <button
                                        onClick={() => handleRecommendClick(query._id)}
                                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:scale-105 transition cursor-pointer"
                                    >
                                        <IoIosHeart /> Recommend
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllQueries;
