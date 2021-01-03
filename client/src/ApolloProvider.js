// 0.1. Declaring all dependency imports
import React from 'react';
import ApolloClient from 'apollo-client';               // GraphQL engine
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';   // GraphQL data provider

// 0.2. Declaring all file imports
import App from './App.js';

// 1. Define the GraphQL engine to be used
const backendServer = createHttpLink( {uri: 'http://localhost:5000'} );
const cache = new InMemoryCache();

const client = new ApolloClient( {link: backendServer, cache} );

// 2. Put the ReactJS app inside the GraphQL data provider
// This enables the ReactJS app to use data from GraphQL backend
export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);