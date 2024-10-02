import React, { useState, useEffect } from 'react';

export default function EditPost() {
    const [post, setPost] = useState({
        title: "",
        content: ""
    });

    // This can be populated by fetching the post details from an API or some source
    useEffect(() => {
        // Simulating fetching post data (you would use actual API calls here)
        const fetchedPost = {
            title: "Sample Title",
            content: "Sample Content"
        };
        setPost(fetchedPost);
    }, []);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Edited Post:", post);
        // You would typically submit the updated post to an API here
    }

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Content:
                    <textarea
                        name="content"
                        value={post.content}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
}
