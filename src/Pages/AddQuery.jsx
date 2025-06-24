import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Cover from '../Components/Cover';
import Swal from 'sweetalert2';

const AddQuery = () => {
    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [photoURL, setphotoURL] = useState('');

    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            setUserName(user.displayName || '');
            setphotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleAddQuery = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newQuery = Object.fromEntries(formData.entries());

        const requiredFields = [
            'ProductName', 'ProductBrand', 'ProductImage', 'QueryTitle', 'BoycottReason'
        ];
        for (let field of requiredFields) {
            if (!newQuery[field]) {
                Swal.fire({
                    title: "Error",
                    text: `${field.replace(/([A-Z])/g, ' $1')} is required.`,
                    icon: "error"
                });
                return;
            }
        }

        newQuery.email = email;
        newQuery.userName = userName;
        newQuery.photoURL = photoURL;
        newQuery.date = new Date().toISOString();
        newQuery.recommendationCount = 0;

        fetch('https://suggesto-product-reco-server.vercel.app/queries', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newQuery)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId || data.acknowledged) {
                    Swal.fire({
                        title: "Query Added Successfully!",
                        icon: "success"
                    });
                    form.reset();
                }
            });
    };


    return (
        <div>
            <Cover title="Share Your Thoughts" highlighted="ADD QUERY" current="Add Query" />
            <div className="px-6 max-w-7xl mx-auto py-10 md:py-16">
                <p className="mb-3 text-xl md:text-2xl font-bold text-orange-500 pacifico-regular tracking-wider logo-text">Query Manager</p>
                <h1 className="text-3xl md:text-4xl tracking-wide font-semibold mb-10">
                    Add a New <span className="font-bold text-orange-500 uppercase">Query</span>
                </h1>
                <form onSubmit={handleAddQuery} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input name="ProductName" label="Product Name" placeholder="Product Name" />

                        <Input name="ProductBrand" label="Product Brand" placeholder="Product Brand" />

                        <Input name="ProductImage" label="Product Image-URL" placeholder="Product Image-URL" />

                        <Input name="QueryTitle" label="Query TItle" placeholder="e.g., Is there any Better product...?" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Boycotting Reason Details</label>
                        <textarea
                            name="BoycottReason"
                            placeholder="the reason you don’t want this product"
                            rows="5"
                            className="p-4 bg-gray-800/50 w-full rounded-md outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-8 text-sm md:text-base rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer font-semibold tracking-wide"
                        >
                            ADD QUERY
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Input = ({ name, label, type = "text", placeholder, value, readOnly = false }) => (
    <div>
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={value}
            readOnly={readOnly}
            className="p-4 bg-gray-800/50 w-full rounded-md outline-none"
        />
    </div>
);

const Select = ({ name, label, options }) => (
    <div>
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <select
            name={name}
            defaultValue=""
            className="p-4 bg-gray-800/50 w-full rounded-md outline-none"
        >
            <option value="">Select {label}</option>
            {options.map(option => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
            ))}
        </select>
    </div>
);

export default AddQuery;