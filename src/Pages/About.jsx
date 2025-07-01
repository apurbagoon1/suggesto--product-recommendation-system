import React, { useEffect } from 'react';
import { FaQuestionCircle, FaRegLightbulb, FaCogs, FaUsers, FaArrowLeft } from 'react-icons/fa';
import Cover from '../Components/Cover';

const About = () => {
  useEffect(() => {
    document.title = 'Suggesto | About';
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      <Cover
        title="Share Your Thoughts"
        highlighted="ADD QUERY"
        current="Add Query"
      />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">About Suggesto</h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
          <span className="font-semibold text-orange-500">Suggesto</span> is a product recommendation platform where users help each other find the best alternatives through shared queries, recommendations, and comments.
        </p>

        <div className="space-y-12">

          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaRegLightbulb className="text-2xl text-orange-500" />
              <h2 className="text-2xl font-semibold">How It Works</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Users post <span className="font-semibold text-orange-500">queries</span> about products they’re exploring. Others can browse these queries and submit helpful <span className="font-semibold text-orange-500">recommendations</span> based on their experience or research.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaCogs className="text-2xl text-orange-500" />
              <h2 className="text-2xl font-semibold">Key Features</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><span className="text-orange-500 font-semibold">Post Queries:</span> Ask for product advice or suggestions.</li>
              <li><span className="text-orange-500 font-semibold">Edit/Delete Queries:</span> Easily manage your posted queries.</li>
              <li><span className="text-orange-500 font-semibold">Browse Others' Queries:</span> Discover new products and perspectives.</li>
              <li><span className="text-orange-500 font-semibold">Submit Recommendations:</span> Share your best product suggestions.</li>
              <li><span className="text-orange-500 font-semibold">Manage Your Recommendations:</span> Update or remove them anytime.</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaUsers className="text-2xl text-orange-500" />
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              To create a reliable community-driven platform where product decisions are made based on honest recommendations — not paid reviews or ads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
