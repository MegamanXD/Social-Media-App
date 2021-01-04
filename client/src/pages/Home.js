// 0.1. Declaring all dependency imports
import React from 'react'
import { useQuery } from '@apollo/client';

// 0.2. Declaring all file imports
import { GET_ALL_POST } from '../services/posts.js'

function Home() {
    // 1. Pre-processing
    const { data } = useQuery(GET_ALL_POST)
    if (data) {
        const posts = data.getPosts;
        console.log(posts)
    }
    
    // 2. Define how the component looks like
    return (
        <div>
            <h1>Home page</h1>
        </div>
    )
}

// 3. Export the component for later use
export default Home;