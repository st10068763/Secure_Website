import './App.css';
import React from 'react';
// using a route to define the different pages of the app
import { Route, Routes } from 'react-router-dom';
// importing the components
import Navbar from './components/navbar';
import PostList from './components/postList';
import PostEdit from './components/postEdit'; 
import CreatePost from './components/postCreate';
import Register from './components/register';
import Login from './components/login';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<PostEdit />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
