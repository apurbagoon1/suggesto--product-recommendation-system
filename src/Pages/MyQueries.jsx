import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cover from '../Components/Cover';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import EmptyBox from '../assets/box.png';
import { MdDelete, MdEdit } from 'react-icons/md';
import Loading from './Loading';
import { IoIosEye } from 'react-icons/io';
import { FaThLarge, FaTable } from 'react-icons/fa';

const MyQueries = () => {
    const { user } = useContext(AuthContext);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCardView, setIsCardView] = useState(true);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/addQuery');
    };

    useEffect(() => {
        document.title = 'Suggesto | My Queries';
        const fetchUserQueries = async () => {
            try {
                const res = await fetch(`https://suggesto-product-reco-server.vercel.app/queries`, {
                    credentials: 'include'
                });
                const data = await res.json();
                const userQueries = data
                    .filter(query => query?.email === user?.email)
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                setQueries(userQueries);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching queries:", error);
                setLoading(false);
            }
        };
        fetchUserQueries();
    }, [user]);

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

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this query!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`https://suggesto-product-reco-server.vercel.app/queries/${id}`, {
                        method: 'DELETE',
                        credentials: 'include',
                    });
                    const data = await res.json();
                    if (data.deletedCount === 1 || data.message === "Query deleted successfully.") {
                        Swal.fire('Deleted!', 'Your query has been deleted.', 'success');
                        setQueries(prev => prev.filter(query => query._id !== id));
                    } else {
                        Swal.fire('Not Found!', 'Query could not be found.', 'error');
                    }
                } catch {
                    Swal.fire('Error!', 'Something went wrong.', 'error');
                }
            }
        });
    };

    if (loading) return <Loading />;

    return (
        <div>
            <Cover title="Your Product Concerns" highlighted="MY QUERIES" current="My Queries" />
            <div className="bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 py-10 px-5 text-center shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 pacifico-regular">Share Your Experience</h2>
                <p className="text-lg md:text-xl text-gray-700 mb-8">Add your product concerns and help others find better alternatives.</p>
                <button onClick={handleNavigate} className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform font-semibold uppercase cursor-pointer">
                    Add Queries
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-2 py-8 md:py-12 lg:py-16">
                <div className="flex justify-between items-center flex-wrap mb-6 md:mb-10">
                    <div className='space-y-2'>
                        <h2 className="text-2xl md:text-4xl font-bold text-orange-500 pacifico-regular tracking-wide">Your Query Collection</h2>
                        <p className="md:text-xl tracking-wider">Track, update, and manage your product-related queries all in one place.</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <button onClick={() => setIsCardView(true)} className={`px-3 py-2 rounded ${isCardView ? 'bg-gradient-to-tr from-yellow-500 to-orange-600 text-white' : 'bg-gray-200 text-black cursor-pointer'}`}>
                            <FaThLarge size={20} className='hover:scale-110' />
                        </button>
                        <button onClick={() => setIsCardView(false)} className={`px-3 py-2 rounded ${!isCardView ? 'bg-gradient-to-tr from-yellow-500 to-orange-600 text-white' : 'bg-gray-200 text-black cursor-pointer'}`}>
                            <FaTable size={20} className='hover:scale-110' />
                        </button>
                    </div>
                </div>

                {queries.length === 0 ? (
                    <div className="text-center my-16 space-y-5">
                        <img src={EmptyBox} alt="No Query" className="w-40 mx-auto" />
                        <h3 className="text-3xl font-bold text-orange-400">No queries added yet.</h3>
                        <Link to="/addQuery">
                            <button className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform font-semibold uppercase">
                                Add a Query
                            </button>
                        </Link>
                    </div>
                ) : isCardView ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {queries.map((query) => (
                            <div key={query._id} className="bg-white/80 shadow-md rounded-lg overflow-hidden hover:shadow-lg hover:scale-[1.02] transition flex flex-col flex-1">
                                <img src={query.ProductImage} alt={query.ProductName} className="w-full h-68 object-cover rounded-t-lg" />
                                <div className="p-5 space-y-2 flex flex-col flex-1">
                                    <h3 className="text-xl md:text-2xl font-bold text-center text-orange-500/80">{query.QueryTitle}</h3>
                                    <h3 className="md:text-lg font-bold text-gray-700 border-b border-orange-300 py-1">Product Information</h3>
                                    <div className="text-gray-700 mt-2">
                                        <p><span className="font-semibold">Name:</span> {query.ProductName}</p>
                                        <p><span className="font-semibold">Brand:</span> {query.ProductBrand}</p>
                                        <p className="text-sm text-gray-500 mt-2 italic text-right">{formatTimeAgo(query.date)}</p>
                                    </div>
                                    <div className="mt-auto flex justify-between pt-3">
                                        <button onClick={() => navigate(`/updateQuery/${query._id}`)} className="tracking-wide font-medium px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-700 text-white rounded-xl hover:bg-red-600 shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform"><MdEdit /> Update</button>
                                        <Link to={`/queryDetails/${query._id}`}>
                                            <button className="text-orange-500 hover:text-white rounded-xl shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform border-2 border-orange-500 px-5 py-1.5 tracking-wide font-medium hover:bg-gradient-to-tr from-yellow-600 to-orange-700"><IoIosEye /> View</button>
                                        </Link>
                                        <button onClick={() => handleDelete(query._id)} className="tracking-wide font-medium px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-700 text-white rounded-xl hover:bg-red-600 shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform"><MdDelete /> Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow border border-orange-300">
                        <table className="min-w-[800px] w-full text-sm text-left text-gray-700 bg-white">
                            <thead className="text-xs text-white uppercase bg-orange-500/90 sticky top-0 z-10">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-center">Image</th>
                                    <th scope="col" className="px-6 py-4 text-center">Query Title</th>
                                    <th scope="col" className="px-6 py-4 text-center">Product Name</th>
                                    <th scope="col" className="px-6 py-4 text-center">Brand</th>
                                    <th scope="col" className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-100">
                                {queries.map((query) => (
                                    <tr key={query._id} className="hover:bg-orange-50 transition-colors duration-200">
                                        <td className="px-6 py-4">
                                            <img
                                                src={query.ProductImage}
                                                alt={query.ProductName}
                                                className="w-18 h-12 md:h-16 mx-auto rounded-md object-cover"
                                            />
                                        </td>
                                        <td className="text-center px-6 py-4 font-medium text-orange-600">{query.QueryTitle}</td>
                                        <td className="text-center px-6 py-4">{query.ProductName}</td>
                                        <td className="text-center px-6 py-4">{query.ProductBrand}</td>
                                        <td className="px-6 py-8 flex gap-2 justify-center items-center">
                                            <button
                                                onClick={() => navigate(`/updateQuery/${query._id}`)}
                                                className="font-medium px-3 py-1 bg-gradient-to-tr from-yellow-500 to-orange-700 text-white rounded-md hover:bg-red-600 shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                                            >
                                                <MdEdit size={16} />
                                            </button>
                                            <Link to={`/queryDetails/${query._id}`}>
                                                <button className="text-orange-500 hover:text-white rounded-md shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform border-2 border-orange-500 px-3 py-1 tracking-wide font-medium hover:bg-gradient-to-tr from-yellow-600 to-orange-700">
                                                    <IoIosEye size={16} />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(query._id)}
                                                className="font-medium px-3 py-1 bg-gradient-to-tr from-yellow-500 to-orange-700 text-white rounded-md hover:bg-red-600 shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                                            >
                                                <MdDelete size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyQueries;
