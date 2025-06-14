import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from './Loading';
import Cover from '../Components/Cover';

const QueryDetails = () => {
    const { id } = useParams();
    const [query, setQuery] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const res = await fetch(`http://localhost:5000/queries`);
                const data = await res.json();
                const found = data.find(q => q._id === id);
                setQuery(found);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching query:", error);
                setLoading(false);
            }
        };

        fetchQuery();
    }, [id]);

    if (loading) return <Loading />;
    if (!query) return <div className="text-center py-20 text-red-500 font-bold text-xl">Query Not Found</div>;

    return (
        <div>
            <Cover title="Your Query Insights" highlighted="QUERY DETAILS" current="Query Details" />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="text-center mt-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2 pacifico-regular tracking-wide">Details of {query.ProductName}</h1>
                    <p className="md:text-xl tracking-wider">Get a deeper look into the concerns, reasons, and recommendations for this product.</p>
                </div>
                <div className="bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 shadow-lg rounded p-4">
                    <img src={query.ProductImage} alt={query.ProductName} className="w-full rounded object-cover" />
                    <div className='space-y-5 p-6'>
                        <h2 className="text-3xl font-bold text-orange-500">{query.QueryTitle}</h2>
                        <p className="text-lg text-gray-800 leading-relaxed">
                            <span className="font-bold text-gray-700">Boycott Reason:</span><br />
                            {query.BoycottReason}
                        </p>
                        <div className="sm:flex justify-between items-center text-lg">
                            <div>
                                <p><span className="font-bold">Product Name:</span> {query.ProductName}</p>
                                <p><span className="font-bold">Brand:</span> {query.ProductBrand}</p>
                                <p><span className="font-bold">Posted By:</span> {query.userName}</p>
                                <p><span className="font-bold">Email:</span> {query.email}</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-2"> <span className="font-bold">Date:</span> {new Date(query.date).toLocaleDateString()}</p>
                                <p><span className="font-bold">Time:</span> {new Date(query.date).toLocaleTimeString()}</p>
                                <p><span className="font-bold">Recommendations:</span> {query.recommendationCount || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueryDetails;
