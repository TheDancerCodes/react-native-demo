import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, Alert } from 'react-native';

export class Header extends React.Component {
    
    // Constructor is a method called when an instance of our class is created, 
    // So it makes sense to initialize our state here.
    constructor(props) {
        super(props); // Super keyword which provides access to our parent class. It prevents a reference error.
        this.state = { 
            isLoggedIn: false, // Set state
            loggedUser: false // Pass to component to display currently logged-in user
        };
    }

    toggleUser = ()=>{
        if (this.state.isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                this.setState({
                    isLoggedIn: false,
                    loggedUser: false
                });
                Alert.alert('User logged out');
            })
        }
        else {
            this.props.navigate('LoginRT')
        }
    }

    
    componentDidMount(){
        
        // Check whether user is logged in, every time this component is mounted
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if (result==='none'){
                console.log('NONE');
            }
            else if (result === null) {
                AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                    console.log('Set user to NONE');
                })
            }
            else {
                this.setState({
                    isLoggedIn: true,
                    loggedUser: result
                });
            }
        })
    }

    render() {
        let display = this.state.isLoggedIn ? this.state.loggedUser : this.props.message;
        return (
            <View style={styles.headStyle}>
                <Image
                style={styles.logoStyle}
                source={ require('./img/logo.png')}
                />
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
        fontSize: 20,
        flex: 1
    },

    // Style for our view that wraps our Text component
    headStyle: {
        paddingTop: 30,
        paddingRight: 10,
        backgroundColor: '#35605a',
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#000000'
    },

    // Logo image style
    logoStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
    }
});