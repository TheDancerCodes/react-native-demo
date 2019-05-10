import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../sections/Header.js';

export class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header message = 'Press to Login' />
                <Text style={{flex:8}}>This will be the Homepage</Text>
                <Text style={{flex:6}}>These other lines are here</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
 