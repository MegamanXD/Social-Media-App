// 0.1. Declaring all dependency imports
import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql';
import GET_POST from '../services/posts.js'

function Home() {
    // 1. Pre-processing
        // None
    
    // 2. Define how the component looks like
    return (
        <div>
            <h1>Home page</h1>
        </div>
    )
}

// 3. Export the component for later use
export default Home;