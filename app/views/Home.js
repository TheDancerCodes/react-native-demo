import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../sections/Header.js';

export class Home extends React.Component {
    render() {
        return (
            <View>
                <Header message = 'Press to Login' />
                <Text>This will be the Homepage</Text>
                <Text>These other lines are here</Text>
                <Text>So you can see the text in the app</Text>
            </View>
        );
    }
}
 