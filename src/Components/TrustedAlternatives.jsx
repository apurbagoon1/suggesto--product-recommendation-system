import React from 'react';
import { motion } from 'framer-motion';

const alternatives = [
    {
        name: 'FairPhone 5',
        image: 'https://i.ibb.co/S4NRZXV0/alt-1.jpg',
        reason: 'Ethically sourced materials and repairable design.'
    },
    {
        name: 'Patagonia Jacket',
        image: 'https://i.ibb.co/sddmBGPk/alt-2.jpg',
        reason: 'Sustainable production and pro-environmental initiatives.'
    },
    {
        name: 'Dr. Bronner’s Soap',
        image: 'https://i.ibb.co/nqQ93XTh/alt-3.jpg',
        reason: 'Organic, cruelty-free, and transparent supply chain.'
    }
];

const TrustedAlternatives = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-2xl md:text-4xl font-bold text-orange-500 mb-4 pacifico-regular tracking-wide text-center">
                Trusted Alternatives
            </h1>
            <p className="md:text-xl mb-10 tracking-wider text-center">
                Discover ethical and community-recommended alternatives to boycotted products.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                {alternatives.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white shadow-xl rounded-lg overflow-hidden"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-orange-500/80">{item.name}</h3>
                            <p className="mt-2 text-gray-700">{item.reason}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TrustedAlternatives;
