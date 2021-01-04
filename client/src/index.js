// 0.1. Declaring all dependency imports
import ReactDOM from 'react-dom';       // ReactJS DOM
// Note: The Document Object Model (DOM) is a programming interface for HTML and XML documents
// It allows programs to change the document structure, style, and content so that the website is dynamic

// 0.2. Declaring all file imports
import reportWebVitals from './reportWebVitals.js';     // Built-in debugger for ReactJS
import ApolloProvider from './ApolloProvider.js';       // A Context API which loads data from the backend
                                                        // Can be accessed from anywhere else in ReactJS

// 1. Render UI from App.js using data from ApolloProvider,js
ReactDOM.render(ApolloProvider, document.getElementById('root'));

// 2. Run built-in debugger for ReactJS
reportWebVitals();
