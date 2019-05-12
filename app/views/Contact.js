import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from 'react-native';
import { Header } from '../sections/Header.js';
import { StackNavigator } from 'react-navigation';

export class Contact extends React.Component {
    
    // static property
    static navigationOptions = {
        header: null // hides the navigation bar
    };

    constructor(props) {
        super(props);
        this.state = { 
            msg: 'Enter Message',
            name: 'Enter Name',
            email: 'Enter your Email Address'
         }
    }

    // NOTE: With arrow functions, you can omit the curly brackets if you have 1 LOC.
    // This method sets the fields to blank using setState.
    clearFields=()=> this.setState({name:'', msg:'', email:''});

    sendMessage=()=> {
        Alert.alert(this.state.name, this.state.msg);
        this.props.navigation.goBack(); // Navigate back to home page once form is submitted.
    };

    render() {
        return (
            <View style={styles.container}>
                <Header message='Press to Login' />
                <Text style={styles.heading}>Contact Us</Text>

                {/* Name Text Input */}
                <TextInput 
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name} 
                />

                {/* Message Text Input */}
                <TextInput 
                    style={styles.multiInput}
                    onChangeText={(text) => this.setState({msg: text})}
                    value={this.state.msg}
                    multiline = {true}
                    numberOfLines = {4} 
                />

                {/* Email Text Input */}
                <TextInput 
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email} 
                />
                
                {/* Button to send our message */}
                <TouchableHighlight onPress={this.sendMessage} underlayColor='#31e981'>
                    <Text style = {styles.buttons}>
                        Send Message
                    </Text>
                </TouchableHighlight>

                {/* Button to clear our fields */}
                <TouchableHighlight onPress={this.clearFields} underlayColor='#31e981'>
                    <Text style = {styles.buttons}>
                        Reset Form
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '45%' // Add padding to push inputs up the page to accommodate keyboard.
    },
    heading: {
        fontSize: 16,
        flex: 1
    },
    inputs: {
        flex: 1,
        width: '80%',
        padding: 10 // Added padding to get some spacing between the inputs
    },
    multiInput: {
        flex: 2,
        width: '90%',
        paddingBottom: 20 // Added padding to give it some spacing from the input above it.
    },
    buttons: {
        marginTop: 15, // Provides some spacing between the buttons.
        fontSize: 16
    }
});