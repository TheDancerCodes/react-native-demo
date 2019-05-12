import React from 'react';
import { Home } from './app/views/Home.js';
import { Contact } from './app/views/Contact.js';
import { StackNavigator } from 'react-navigation';

const MyRoutes = StackNavigator({
  HomeRT: {
    screen: Home
  },
  ContactRT: {
    screen: Contact
  },
},
  {
    // Specifying the component to launch when the app starts
    initialRouteName: 'HomeRT'
  }
);

// The App class has all the methods, objects and values provided by the Component class
export default class App extends React.Component {
  
  // Method that is used to render the JSX used to build our app.
  render() {
    return (
      
      // StackNavigator is a function that returns a RN component.
      <MyRoutes />
    );
  }
}