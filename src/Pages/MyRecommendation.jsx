import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { FaTrash } from 'react-icons/fa';
import Loading from './Loading';
import Cover from '../Components/Cover';
import NoReco from '../assets/no-reco.png'

const MyRecommendation = () => {
    const { user } = useContext(AuthContext);
    const [myRecommendations, setMyRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://suggesto-product-reco-server.vercel.app/recommendations?email=${user.email}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMyRecommendations(data);
                } else {
                    console.error("Unexpected data format:", data);
                    setMyRecommendations([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching recommendations:", error);
                setLoading(false);
            });
    }, [user?.email]);



    const handleDelete = async (recommendationId, queryId) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this recommendation?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`https://suggesto-product-reco-server.vercel.app/recommendations/${recommendationId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                const result = await res.json();
                if (result.deletedCount === 1) {
                    await fetch(`https://suggesto-product-reco-server.vercel.app/queries/decrement/${queryId}`, {
                        method: 'PATCH',
                        credentials: 'include'
                    });

                    setMyRecommendations(prev => prev.filter(r => r._id !== recommendationId));

                    Swal.fire('Deleted!', 'Your recommendation has been deleted.', 'success');
                } else {
                    Swal.fire('Error!', 'Failed to delete recommendation.', 'error');
                }
            } catch (error) {
                console.error('Delete error:', error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };

    if (loading) return <Loading></Loading>;

    return (
        <div>
            <Cover title="Your Suggestions Hub" highlighted="MY RECOMMENDATIONS" current="My Recommendations" />

            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-2xl md:text-4xl pacifico-regular text-center font-bold text-orange-500 my-6">Recommendations You Gave</h1>

                {myRecommendations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <img
                            src={NoReco}
                            alt="No recommendations"
                            className="w-44 mb-6"
                        />
                        <p className="text-center opacity-80 text-lg md:text-xl">
                            You haven't made any recommendations yet!
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded shadow my-8">
                        <table className="min-w-full border border-orange-400 text-sm">
                            <thead className="bg-orange-500 text-white">
                                <tr className="">
                                    <th className="py-3 px-4">Image</th>
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4">Product</th>
                                    <th className="py-3 px-4">Reason</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myRecommendations.map((rec) => (
                                    <tr
                                        key={rec._id}
                                        className="border-b border-orange-300 hover:bg-orange-100 transition"
                                    >
                                        <td className="py-3 px-2 text-center">
                                            <img
                                                src={rec.image}
                                                alt={rec.name}
                                                className="w-18 h-14 md:w-24 md:h-20 object-cover rounded mx-auto"
                                            />
                                        </td>
                                        <td className="py-3 px-2 font-semibold text-orange-500/90">{rec.title}</td>
                                        <td className="py-3 px-2">{rec.name}</td>
                                        <td
                                            className="py-3 px-2 text-center"
                                            title={rec.reason}
                                        >
                                            {rec.reason.length > 60 ? rec.reason.slice(0, 60) + '...' : rec.reason}
                                        </td>
                                        <td className="py-3 px-2">
                                            {new Date(rec.timestamp).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-2 text-center">
                                            <button
                                                onClick={() => handleDelete(rec._id, rec.queryId)}
                                                className="text-red-600 hover:text-red-800 transition cursor-pointer"
                                                title="Delete Recommendation"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {myRecommendations.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-4 text-center text-gray-400">
                                            No recommendations found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRecommendation;
