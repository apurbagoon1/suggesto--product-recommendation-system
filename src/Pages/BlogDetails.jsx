import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Loading from './Loading';
import Cover from '../Components/Cover';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    document.title = 'Suggesto | Blog Details';
    fetch('/blogs.json')
      .then(res => res.json())
      .then(data => {
        const matchedBlog = data.find((item) => item.id === parseInt(id));
        setBlog(matchedBlog);
      });
  }, [id]);

  if (!blog) {
    return <Loading />;
  }

  return (
    <>
      <Cover
        title="Explore Our Insights"
        highlighted="BLOG DETAILS"
        current={blog.title}
      />

      <section className="py-20 px-6 md:px-14 lg:px-28 animate-fadeIn">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-orange-500 leading-tight">
              {blog.title}
            </h1>
            <p className="text-lg">
              By <span className="font-semibold text-orange-500/80">{blog.author}</span> • {blog.date}
            </p>
          </div>

          <div className="prose prose-lg max-w-none leading-relaxed">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          <div>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-8 text-sm md:text-base rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer font-semibold tracking-wide"
            >
              ← Back to Homepage
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
