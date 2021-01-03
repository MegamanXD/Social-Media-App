// 0.1. Declaring all dependency imports
import { BrowserRouter as Router, Route } from 'react-router-dom';    // Help change the page layout based on which page you are on
import { Container } from 'semantic-ui-react';    // Semantic UI built-in Container

// 0.2. Declaring all file imports
// Load website designs from Cascading Style Sheets (.css files)
import 'semantic-ui-css/semantic.min.css';
import './App.css';

// Load components of the web
import MenuBar from './components/MenuBar.js';

// Load web pages
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

// 1. Define how the website looks like
function App() {
  return (
    <Router>
      <Container>
        {/* The menu bar is shown at the top no matter which page your are on */}
        <MenuBar />

        {/* The body is loaded according to which page you are at */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

      </Container>
    </Router>
  );
}

// 2. Export the component for later use
export default App;
