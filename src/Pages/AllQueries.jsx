import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IoIosHeart } from 'react-icons/io';
import { FaThLarge, FaList } from 'react-icons/fa';
import Loading from './Loading';
import Cover from '../Components/Cover';

const AllQueries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isGridView, setIsGridView] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [sortByName, setSortByName] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const res = await fetch('https://suggesto-product-reco-server.vercel.app/queries');
                const data = await res.json();
                const sortedByDate = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setQueries(sortedByDate);
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

    const handleSortToggle = () => {
        if (sortByName === null) setSortByName('asc');
        else if (sortByName === 'asc') setSortByName('desc');
        else setSortByName(null); 
    };

    const filteredQueries = queries.filter(query =>
        query.ProductName.toLowerCase().includes(searchText)
    );

    const sortedQueries = [...filteredQueries].sort((a, b) => {
        if (sortByName === 'asc') {
            return a.ProductName.localeCompare(b.ProductName);
        } else if (sortByName === 'desc') {
            return b.ProductName.localeCompare(a.ProductName);
        } else {
            return new Date(b.date) - new Date(a.date); 
        }
    });

    if (loading) return <Loading />;

    return (
        <div>
            <Cover title="Explore Others' Thoughts" highlighted="ALL QUERIES" current="All Queries" />
            <div className="max-w-7xl mx-auto px-4 py-6 md:pt-10 md:pb-14">
                {/* Top Controls */}
                <div className="flex justify-between items-center mb-8 gap-6 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by Product Name..."
                        className="px-3 py-2 rounded-md border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 flex-1"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsGridView(true)}
                            className={`hidden sm:block px-3 py-2 rounded ${isGridView ? 'bg-gradient-to-tr from-yellow-500 to-orange-600 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            <FaThLarge size={20} />
                        </button>
                        <button
                            onClick={() => setIsGridView(false)}
                            className={`hidden sm:block px-3 py-2 rounded ${!isGridView ? 'bg-gradient-to-tr from-yellow-500 to-orange-600 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            <FaList size={20} />
                        </button>
                        <button
                            onClick={handleSortToggle}
                            className="px-3 py-2 rounded bg-gradient-to-bl from-yellow-500 to-orange-600 hover:bg-orange-300 text-white font-semibold cursor-pointer"
                        >
                            {sortByName === 'asc' && 'Product Name (A → Z)'}
                            {sortByName === 'desc' && 'Product Name (Z → A)'}
                            {sortByName === null && 'Sort by Latest (default)'}
                        </button>
                    </div>
                </div>

                {/* Display Queries */}
                <div className={isGridView ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
                    {sortedQueries.map((query) => (
                        <div
                            key={query._id}
                            className={`bg-white shadow-lg rounded-lg p-5 transition hover:shadow-xl hover:scale-[1.02] ${isGridView ? 'flex flex-col h-full' : 'flex flex-row gap-5 items-center'
                                }`}
                        >
                            <img
                                src={query.ProductImage}
                                alt={query.ProductName}
                                className={`object-cover rounded ${isGridView ? 'w-full h-60' : 'w-40 h-40 sm:w-52 sm:h-52'}`}
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
