import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/blogs.json')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Failed to fetch blogs:', err));
  }, []);

  return (
    <section className="py-20 px-6 md:px-14 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl tracking-wide font-bold text-orange-500">Latest Insights</h2>
          <p className="mt-4 tracking-wide md:text-xl max-w-2xl mx-auto">
            Discover tips, trends, and stories behind smarter product discovery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white/70 rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm">{blog.summary}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>By {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-block text-orange-500 font-semibold hover:underline mt-2"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
