// 0.1. Declaring all dependency imports
import React from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

// 0.2. Declaring all file imports
import { GET_ALL_POST } from "../services/posts.js";
import PostCard from '../components/PostCard';

function Home() {
  // 1. Pre-processing
  const { data } = useQuery(GET_ALL_POST);

  // 2. Define how the component looks like
    return (
        // Divide this section into 3 equal columns
        <Grid columns={3}>
            {/* 2.1. Page title */}
            <Grid.Row className="page-title">
                <h1>All Posts</h1>
            </Grid.Row>

            {/* 2.2. Posts */}
            <Grid.Row>
                { data === undefined                // If the data is not loaded yet
                    ? <h1>Loading posts ...</h1>    // Show that it is loading
                    : data.getPosts.map(            // Else, load each post out
                        eachPost => (
                            <Grid.Column key={eachPost.id} style={{ marginBottom: 20 }}>
                                <PostCard post={eachPost} />
                            </Grid.Column>
                        )
                    )
                }
            </Grid.Row>
        </Grid>
    );
}

// 3. Export the component for later use
export default Home;
