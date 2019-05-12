import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../sections/Header.js';

export class Contact extends React.Component {
    
    // static property
    static navigationOptions = {
        header: null // hides the navigation bar
    };

    render() {
        return (
            <View style={styles.container}>
                <Header message='Press to Login' />
                <Text style={{flex: 8}}>The Contact form will go here</Text>
                <Text style={{flex: 6}}>More Contact form will go here</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});