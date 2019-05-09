import React from 'react';
import { StyleSheet, Text } from 'react-native';

export class Header extends React.Component {
    
    // Constructor is a method called when an instance of our class is created, 
    // So it makes sense to initialize our state here.
    constructor(props) {
        super(props); // Super keyword which provides access to our parent class. It prevents a reference error.
        this.state = {isLoggedIn: false} // Set state
    }

    toggleUser = ()=>{
        this.setState(previousState => {

            // Set the isLoggedIn state to the opposite of what the previousState was.
            // NOTE: state starts off as false. Once method is run, the state changes to true.
            return { isLoggedIn: !previousState.isLoggedIn };
        });
    }

    render() {
        let display = this.state.isLoggedIn ? 'Sample User' : this.props.message;
        return (
            <Text onPress={this.toggleUser}>{display}</Text>
        );
    }
}