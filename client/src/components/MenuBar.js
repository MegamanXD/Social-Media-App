// 0.1. Declaring all dependency imports
import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';      // ReactJS doesn't have href, so we use Link instead

// 1. Define how the component looks like
function MenuBar() {
  // Get the current path
  const pathname = window.location.pathname;

  // If the current path is / then go to Homepage, otherwise go to /path
  const path = (pathname === '/') ? 'home' : pathname.substr(1);

  // Define the states and event-handlers of the component
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size="massive" color="teal">
      {/* Home button on the left */}
      <Menu.Item
        name="home"                         // Content of the button
        active={activeItem === 'home'}
        onClick={handleItemClick}           // Assign a function to the button
        as={Link} to="/"                    // Use the button as a href to /
      />

      {/* Login & Register buttons on the right */}
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link} to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link} to="/register"
        />
      </Menu.Menu>

    </Menu>
  )
}

// 2. Export the component for later use
export default MenuBar;