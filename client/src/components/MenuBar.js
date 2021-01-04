// 0.1. Declaring all dependency imports
import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';      // ReactJS doesn't have href, so we use Link instead

// 1. Define how the component looks like
function MenuBar() {
  // Get the current path
  const pathname = window.location.pathname;
  const path = pathname.substr(1);

  // Define the states and event-handlers of the component
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  // Define the template of a MenuItem
  class MenuItem extends React.Component {
    render() {
      const itemName = this.props.itemName; // Access itemName from class properties (props)
      const pathName = "/".concat(itemName)

      return (
        <Menu.Item
          name={itemName}                   // Content of the button
          active={activeItem === itemName}
          onClick={handleItemClick}         // Assign a function to the button
          as={Link} to= {pathName}          // Use the button as a href to /pathName
        />
      );
    }
  }

  return (
    <Menu pointing secondary size="massive" color="teal">
      {/* Home button on the left */}
      <MenuItem itemName = 'home'/>

      {/* Login & Register buttons on the right */}
      <Menu.Menu position="right">
        <MenuItem itemName = 'login' />
        <MenuItem itemName = 'register' />
      </Menu.Menu>

    </Menu>
  )
}

// 2. Export the component for later use
export default MenuBar;