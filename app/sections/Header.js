import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
            <View style={styles.headStyle}>
                <Text
                    style={styles.headText}
                    onPress={this.toggleUser}>{display}
                </Text>
            </View>
        );
    }
}

// const styles holds our style object
const styles = StyleSheet.create({

    // Style for our text component
    headText: {
        textAlign: 'right',
        color: '#ffffff',
        fontSize: 20
    },

    // Style for our view that wraps our Text component
    headStyle: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingRight: 10,
        backgroundColor: '#35605a'
    }


});