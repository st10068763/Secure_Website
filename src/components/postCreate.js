import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';

export default function CreatePost() {
    const [form, setForm] = useState({
        user: "",
        content: "",
        image: "",
    });
    const navigate = useNavigate();

    // Retrieves the user from local storage.
    useEffect(() => {
        const savedUser = localStorage.getItem("name"); // Gets the user name from local storage.
        if (savedUser) {
            setForm((prev) => ({
                ...prev,
                user: savedUser,
            }));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    function updateForm(value) {
        return setForm((prev) => ({
            ...prev,
            ...value,
        }));
    }

    // Function to handle image file change
    async function handleImageOnChange(e) {
        const file = e.target.files[0];
        if (file) {
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(",")[1]; // This removes the 'data:image/jpeg;base64,' part.
                    updateForm({ image: base64String });
                };
                reader.readAsDataURL(file);
            } catch (error) {
                window.alert(`An error has occurred reading the image file: ${error}`);
            }
        }
    }

    // Function to handle form submission
    async function onSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("jwt");

        const newPost = {
            user: form.user,
            content: form.content,
            image: form.image,
        };

        try {
            const response = await fetch('https://localhost:3001/post/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Template literals corrected
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error(`An error has occurred: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(`Post created: ${result}`);
            navigate("/");

        } catch (error) {
            window.alert(`An error has occurred: ${error}`);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                value={form.content} 
                onChange={(e) => updateForm({ content: e.target.value })} 
                placeholder="Write your post..." 
            />
            <input 
                type="file" 
                onChange={handleImageOnChange} 
                accept="image/*" 
            />
            <button type="submit">Create Post</button>
        </form>
    );
}
