import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Cover from '../Components/Cover';

const UpdateQuery = () => {
    const { id } = useParams();
    const [query, setQuery] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/queries/${id}`)
            .then((res) => res.json())
            .then((data) => setQuery(data));
    }, [id]);

    const handleUpdateQuery = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedQuery = {
            ProductName: form.ProductName.value,
            ProductBrand: form.ProductBrand.value,
            ProductImage: form.ProductImage.value,
            QueryTitle: form.QueryTitle.value,
            BoycottReason: form.BoycottReason.value,
        };

        const res = await fetch(`http://localhost:5000/queries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedQuery),
        });

        const result = await res.json();
        if (result.modifiedCount > 0 || result.message === "Query updated successfully.") {
            Swal.fire('Success!', 'Your query has been updated.', 'success');
            navigate('/myQueries');
        } else {
            Swal.fire('No changes', 'No updates were made.', 'info');
        }
    };

    if (!query) return <p className="text-center mt-10 text-lg">Loading Query...</p>;

    return (
        <div>
            <Cover title="Update Your Query" highlighted="UPDATE" current="Update Query" />
            <div className="px-6 max-w-7xl mx-auto py-10 md:py-16">
                <p className="mb-3 text-xl md:text-2xl font-bold text-orange-500 pacifico-regular tracking-wider logo-text">Query Manager</p>
                <h1 className="text-3xl md:text-4xl tracking-wide font-semibold mb-10">
                    Edit Your <span className="font-bold text-orange-500 uppercase">Query</span>
                </h1>
                <form onSubmit={handleUpdateQuery} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input name="ProductName" label="Product Name" value={query.ProductName} />
                        <Input name="ProductBrand" label="Product Brand" value={query.ProductBrand} />
                        <Input name="ProductImage" label="Product Image-URL" value={query.ProductImage} />
                        <Input name="QueryTitle" label="Query Title" value={query.QueryTitle} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Boycotting Reason Details</label>
                        <textarea
                            name="BoycottReason"
                            defaultValue={query.BoycottReason}
                            rows="5"
                            className="p-4 bg-gray-800/50 w-full rounded-md outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-8 text-sm md:text-base rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer font-semibold tracking-wide"
                        >
                            UPDATE QUERY
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Input = ({ name, label, value }) => (
    <div>
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <input
            type="text"
            name={name}
            defaultValue={value}
            className="p-4 bg-gray-800/50 w-full rounded-md outline-none"
            required
        />
    </div>
);

export default UpdateQuery;
