import React from 'react';
import { Home } from './app/views/Home.js';

// The App class has all the methods, objects and values provided by the Component class
export default class App extends React.Component {
  
  // Method that is used to render the JSX used to build our app.
  render() {
    return (
      <Home />
    );
  }
}