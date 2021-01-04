// 0.1. Declaring all dependency imports
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// 0.2. Declaring all file imports
import App from './App.js';

// 1. Define the GraphQL engine to be used
const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache()
});

// 2. Put the ReactJS app inside the GraphQL data provider
// This enables the ReactJS app to use data from GraphQL backend
export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);