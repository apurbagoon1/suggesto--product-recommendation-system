import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IoIosHeart } from 'react-icons/io';
import { FaThLarge, FaList } from 'react-icons/fa';
import Loading from './Loading';
import Cover from '../Components/Cover';

const AllQueries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const res = await fetch('http://localhost:5000/queries');
                const data = await res.json();
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setQueries(sorted);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching queries:', err);
                setLoading(false);
            }
        };
        fetchQueries();
    }, []);

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

    const handleRecommendClick = (id) => {
        navigate(`/queryDetails/${id}`);
    };

    if (loading) return <Loading />;

    return (
        <div>
            <Cover title="Explore Others' Thoughts" highlighted="ALL QUERIES" current="All Queries" />
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setIsGridView(!isGridView)}
                        className="text-white bg-gradient-to-tr from-yellow-500 to-orange-600 px-4 py-2 rounded-full flex items-center gap-2 shadow hover:opacity-85 transition cursor-pointer"
                    >
                        {isGridView ? <FaList /> : <FaThLarge />}
                        {isGridView ? 'List View' : 'Grid View'}
                    </button>
                </div>

                <div className={isGridView ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
                    {queries.map((query) => (
                        <div
                            key={query._id}
                            className={`bg-white shadow rounded-lg p-5 transition hover:shadow-lg ${isGridView ? 'flex flex-col h-full' : 'flex flex-row gap-5 items-center'
                                }`}
                        >
                            <img
                                src={query.ProductImage}
                                alt={query.ProductName}
                                className={`object-cover rounded ${isGridView ? 'w-full h-60' : 'w-52 h-52'}`}
                            />
                            <div className={`flex-1 flex flex-col ${isGridView ? 'space-y-2' : 'space-y-2'}`}>
                                <h2 className={`text-xl font-bold text-orange-500 ${isGridView ? 'mt-3' : ''}`}>{query.QueryTitle}</h2>
                                <p className={`text-sm italic text-gray-500 ${isGridView ? 'text-center' : ''}`}>{formatTimeAgo(query.date)}</p>
                                <p className="text-gray-700 text-sm">{query.BoycottReason.slice(0, 100)}...</p>
                                <div className="text-gray-700 text-sm mt-1 mb-3">
                                    <p><strong>Product:</strong> {query.ProductName}</p>
                                    <p><strong>Brand:</strong> {query.ProductBrand}</p>
                                    <p><strong>By:</strong> {query.userName}</p>
                                </div>
                                <div className="flex justify-between items-center mt-auto pt-3 border-t border-orange-200">
                                    <p className="text-orange-600 font-semibold text-sm">
                                        {query.recommendationCount || 0} Recommend{query.recommendationCount !== 1 ? 's' : ''}
                                    </p>
                                    <button
                                        onClick={() => handleRecommendClick(query._id)}
                                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition cursor-pointer"
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
