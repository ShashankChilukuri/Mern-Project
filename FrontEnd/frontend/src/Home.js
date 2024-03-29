import React from 'react'
import { useParams } from 'react-router-dom';
import AllPosts from './Posts/AllPosts';

 const Home = () => {
  let { name } = useParams();
  return (
    <div>
    <h1>Welcome {name}</h1>
    <AllPosts/>

    </div>
  )
}

export default Home;