import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch('/blogs.json')
      .then(res => res.json())
      .then(data => {
        const matchedBlog = data.find((item) => item.id === parseInt(id));  
        setBlog(matchedBlog);
      });
  }, [id]);

  if (!blog) {
    return <div className="py-32 text-center text-lg text-gray-600">Loading blog...</div>;
  }

  return (
    <section className="bg-white py-20 px-6 md:px-14 lg:px-28">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="rounded-xl overflow-hidden shadow-md">
          <img src={blog.image} alt={blog.title} className="w-full h-[350px] object-cover" />
        </div>

        <div className="text-left space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">{blog.title}</h1>
          <p className="text-gray-500">
            By <span className="font-semibold">{blog.author}</span> • {blog.date}
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
