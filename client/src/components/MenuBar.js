// 0.1. Declaring all dependency imports
import React, { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom"; // ReactJS doesn't have href, so we use Link instead

// 0.2. Declaring all file imports
  // None

function MenuBar() {
  // 1. Pre-processing
  // 1.1. Define the states of the component
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  // 1.2. Define event-handlers of the component
  const handleItemClick = (e, { name }) => setActiveItem(name);

  // 1.3. Define the template of each MenuItem
  class MenuItem extends React.Component {
    render() {
      const itemName = this.props.itemName;   // Access itemName from class properties (props)
      const pathName = "/".concat(itemName);  // pathName = /itemName
      const content = this.props.content;

      return (
        <Menu.Item
          name={itemName}
          active={activeItem === itemName}
          onClick={handleItemClick}       // Assign a function to the button
          as={Link} to={pathName}         // Use the button as a href to /pathName
        >
          {content}
        </Menu.Item>
      );
    }
  }

  // 2. Define how the component looks like
  return (
    <Menu inverted color="blue">
      {/* Home button on the left */}
      <MenuItem itemName="home" content={ <Icon name="home"/> }/>

      {/* Login & Register buttons on the right */}
      <Menu.Menu position="right">
        <MenuItem itemName="login" />
        <MenuItem itemName="register" />
      </Menu.Menu>
    </Menu>
  );
}

// 3. Export the component for later use
export default MenuBar;
