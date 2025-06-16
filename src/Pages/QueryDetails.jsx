import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router';
import Loading from './Loading';
import Cover from '../Components/Cover';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const QueryDetails = () => {
    const { id } = useParams();
    const [query, setQuery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);
    const [form, setForm] = useState({
        title: '',
        name: '',
        image: '',
        reason: ''
    });

    const { user } = useContext(AuthContext);

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

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await fetch(`http://localhost:5000/recommendations/${id}`,{
                    credentials: 'include',
                });
                const data = await res.json();
                setRecommendations(data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddRecommendation = async (e) => {
        e.preventDefault();
        if (!user) return Swal.fire('Error', 'You must be logged in to recommend.', 'error');

        const recommendationData = {
            ...form,
            queryId: query._id,
            QueryTitle: query.QueryTitle,
            productName: query.ProductName,
            userEmail: query.email,
            userName: query.userName,
            recommenderEmail: user.email,
            recommenderName: user.displayName,
            timestamp: new Date().toISOString()
        };

        try {
            const res = await fetch('http://localhost:5000/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(recommendationData)
            });

            const data = await res.json();
            if (data.insertedId) {
                await fetch(`http://localhost:5000/queries/${query._id}/recommend`, {
                    method: 'PATCH',
                    credentials: 'include',
                });
                Swal.fire('Success', 'Recommendation added.', 'success');
                setRecommendations(prev => [...prev, recommendationData]);
                setForm({ title: '', name: '', image: '', reason: '' });
            }
        } catch {
            Swal.fire('Error', 'Could not submit recommendation.', 'error');
        }
    };

    if (loading) return <Loading />;
    if (!query) return <div className="text-center py-20 text-red-500 font-bold text-xl">Query Not Found</div>;

    return (
        <div>
            <Cover title="Your Query Insights" highlighted="QUERY DETAILS" current="Query Details" />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="text-center mt-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2 pacifico-regular tracking-wide">Details of {query.ProductName}</h1>
                    <p className="md:text-xl tracking-wider">Get a deeper look into the concerns, reasons, and recommendations for this product.</p>
                </div>
                <div className="bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 shadow-lg rounded p-4">
                    <img src={query.ProductImage} alt={query.ProductName} className="w-full rounded md:h-[70vh] object-cover" />
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
                        <div className='flex justify-center'>
                            <Link to="/allQueries">
                                <button
                                    className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-2 px-8 text-sm md:text-base rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer font-semibold tracking-wide mt-2"
                                >
                                    Back to All Queries
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-10 md:mt-16">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-orange-500 pacifico-regular">Add a Recommendation</h3>
                    <form onSubmit={handleAddRecommendation} className="space-y-4 shadow p-6 rounded">

                        <div>
                            <label htmlFor="title" className="block font-medium mb-1">Recommendation Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g., Gentle and Affordable Option"
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block font-medium mb-1">Recommended Product Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g., NatureGlow Moisturizer"
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block font-medium mb-1">Recommended Product Image URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="Paste the image link here"
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="reason" className="block font-medium mb-1">Why are you recommending this product?</label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={form.reason}
                                onChange={handleChange}
                                placeholder="Explain why this product is a better or ethical choice"
                                className="w-full border rounded p-2"
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-8 text-sm md:text-base rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer font-semibold tracking-wide"
                        >
                            Add Recommendation
                        </button>
                    </form>
                </div>

                <div className="mt-10">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-orange-500 pacifico-regular">All Recommendations</h3>
                    <div className="space-y-4">
                        {recommendations.length === 0 ? (
                            <p className="text-gray-500 md:text-xl">No recommendations added yet.</p>
                        ) : (
                            recommendations.map((rec, idx) => (
                                <div key={idx} className="border-l-4 border-orange-400 bg-white p-4 shadow rounded">
                                    <div className="flex items-center gap-4">
                                        <img src={rec.image} alt={rec.name} className="w-24 h-24 md:w-32 md:h-32 rounded object-cover" />
                                        <div className=''>
                                            <h4 className="text-lg md:text-xl font-bold text-orange-500">{rec.title}</h4>
                                            <p className="text-gray-800"><strong>Product:</strong> {rec.name}</p>
                                            <p className="text-sm text-gray-600"><strong>By:</strong> {rec.recommenderName} | {new Date(rec.timestamp).toLocaleString()}</p>
                                            <p className="text-gray-700 mt-2">{rec.reason}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueryDetails;
