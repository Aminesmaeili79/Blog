import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as path from "node:path";

function BlogManager() {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        content: ''
    });
    const [editingBlog, setEditingBlog] = useState(null);
    const [editBlogData, setEditBlogData] = useState({
        title: '',
        author: '',
        content: ''
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get('/blogs')
            setBlogs(response.data)
            console.log(blogs)
        }

        fetchBlogs();
    }, []);

    return (
       <>
           <h1 className="uppercase flex flex justify-center mb-24">blogs</h1>
           <div>
               { blogs.map(blog => (
                  <div className="blog flex flex-col items-center bg-blue-50 text-gray-800 py-16 rounded-xl cursor-pointer hover:bg-blue-100 hover:translate-y-[-2%] active:translate-y-[-1%] transition-all duration-300" key={blog._id}>
                      <h2 className="font-bold mb-8" key={blog._id}>{blog.title}</h2>
                      <h3 className="font-semibold mb-2" key={blog.author}>Author: {blog.author}</h3>
                      <h4 className="text-sm italic font-thin mb-16" key={blog.date}>{blog.date}</h4>
                      <p className="text-center font-semibold w-[75%]">{blog.content}</p>
                  </div>
               ))}
           </div>
       </>
    );
}

export default BlogManager;