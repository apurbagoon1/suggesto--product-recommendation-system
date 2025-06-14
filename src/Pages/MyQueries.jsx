import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cover from '../Components/Cover';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import EmptyBox from '../assets/box.png'
import { MdDelete, MdEdit } from 'react-icons/md';
import Loading from './Loading';
import { IoIosEye } from 'react-icons/io';

const MyQueries = () => {
    const { user } = useContext(AuthContext);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/addQuery');
    };

    useEffect(() => {
        const fetchUserQueries = async () => {
            try {
                const res = await fetch(`http://localhost:5000/queries`);
                const data = await res.json();
                const userQueries = data.filter(query => query?.email === user?.email);
                setQueries(userQueries);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching qureies:", error);
                setLoading(false);
            }
        };

        fetchUserQueries();
    }, [user]);

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
                    const res = await fetch(`http://localhost:5000/queries/${id}`, {
                        method: 'DELETE',
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


    if (loading) return <Loading></Loading>;

    return (
        <div>
            <Cover title="Your Product Concerns" highlighted="MY QUERIES" current="My Queries" />
            <div className="bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 py-10 px-5 text-center shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 pacifico-regular">
                    Share Your Experience
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                    Add your product concerns and help others find better alternatives.
                </p>
                <button
                    onClick={handleNavigate}
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-8 text-sm md:text-base rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer font-semibold tracking-wide uppercase"
                >
                    Add Queries
                </button>
            </div>
            <div className="max-w-7xl mx-auto px-4 lg:px-2 py-8 md:py-12 lg:py-16">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-orange-500 mt-2 mb-4 pacifico-regular tracking-wide text-center">
                        Your Query Collection
                    </h2>
                    <p className='md:text-xl mb-10 tracking-wider text-center'>Track, update, and manage your product-related queries all in one place.</p>
                </div>

                {queries.length === 0 ? (
                    <div className="text-center my-16 space-y-5">
                        <img
                            src={EmptyBox}
                            alt="No Query"
                            className="w-40 mx-auto"
                        />
                        <h3 className="text-3xl font-bold text-orange-400">No queries added yet.</h3>
                        <Link to="/addQuery">
                            <button className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-8 text-sm md:text-base rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer font-semibold tracking-wide uppercase">
                                Add a Query
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {queries.map((query) => (
                            <div
                                key={query._id}
                                className="bg-white/80 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition flex flex-col flex-1"
                            >
                                <img
                                    src={query.ProductImage}
                                    alt={query.ProductName}
                                    className="w-full h-68 object-cover rounded-t-lg"
                                />
                                <div className="p-5 space-y-2 flex flex-col flex-1">
                                    <h3 className="text-2xl font-bold text-center text-orange-400">
                                        {query.QueryTitle}
                                    </h3>
                                    <p className="text-gray-700 text-justify mb-3">{query.BoycottReason.slice(0, 100)}...</p>
                                    <h3 className="text-lg font-bold text-gray-800 border-b border-orange-300 pb-1">Product Information</h3>

                                    <div className="text-gray-700 mt-2">
                                        <p className="flex items-center gap-2">
                                            <span className="font-semibold">Name:</span> {query.ProductName}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-semibold">Brand:</span> {query.ProductBrand}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex justify-between pt-3 px-1.5">
                                        <button
                                            className="tracking-wide font-medium px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-700 text-white rounded-2xl hover:bg-red-600 shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                                        >
                                            <MdEdit /> Update
                                        </button>
                                        <Link to={`/queryDetails/${query._id}`}>
                                            <button
                                                className="text-white rounded-2xl hover:bg-blue-600 shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform border-2 border-orange-500 px-4 py-1.5 tracking-wide font-medium hover:bg-gradient-to-tr from-yellow-600 to-orange-700 "
                                            >
                                                <IoIosEye /> View
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(query._id)}
                                            className="tracking-wide font-medium px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-700 text-white rounded-2xl hover:bg-red-600 shadow-xl flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                                        >
                                            <MdDelete /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyQueries;