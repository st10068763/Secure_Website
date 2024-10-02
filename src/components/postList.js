import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Post = (props) => (
    <tr>
        <td>{props.post.user}</td>
        <td>{props.post.content}</td>

        <td>
            {props.post.image && (
                <img
                src={'data:image/jpeg;base64,${props.post.image}'}
                alt="Post Iamge"
                style={{maxWidth: '100px', maxHeight: '100px', objectFit: 'cover'}}
                />
            )}
        </td>
        <td>
            <button className="btn btn-link"
            onClick={() =>{
                props.deletePost(props.post._id);
            }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function PostList() {
   const [post, setPost] = useState([]);

   //This method fetches the post from the database.
   useEffect(()=> {
    async function getPost() {
        const response = await fetch('https://localhost:3001/post/');

        if (!response.ok) {
            const message = 'An error has occured: ${response.statusText}';
            window.alert(message);
            return;
        }

        const post = await response.json();
        setPost(post);
    }

    getPost();

    return;
   }, [post.length]);

   // THis method will delete a post
   async function deletePost(id) {
    const token = localStorage.getItem("jwt");
    await fetch('https://localhost:3001/post/${id}',{
        method: "DELETE",
        headers: {
            "Authorization": 'Bearer ${token}',
        },
    });

    const newPosts = post.filter((el) => el._id !==id);
    setPost(newPosts);    
   }

   // This methos will map out the posts on the table
   function PostList(){
    return post.map((post) => {
        return(
            <Post
            post={post}
            deletePost={() => deletePost(post._id)}
            key={post._id}
            />
        );
    });
   }

   return(
    <body>
        <div className="container">
            <h3 className="header">APDS notice Board</h3>
            <table className="table table-striped" style={{margin: 20}}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Caption</th>
                        <th>Image</th>
                        <th>Action</th> {/* Added colum for action */}
                    </tr>
                </thead>
                <tbody>{PostList()}</tbody>
            </table>
        </div>
    </body>
   );
}