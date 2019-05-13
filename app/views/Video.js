import React from 'react';
import { Text, View, FlatList, Image, TouchableWithoutFeedback } from 'react-native';

export class Video extends React.Component {

    // Hide default React Navigation Navbar
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        // Initialize State
        this.state = { listLoaded: false }; // Indicate when our Youtube data has been loaded
    }

    // Runs after the component is displayed in our app.
    componentDidMount() {
        return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key=AIzaSyB-S3H460x7sR-0iPAzqkAjtPti0UpZjmw')
        .then((response) => response.json())
        .then((responseJson)=> {
            this.setState({
                listLoaded: true, // Data successfully returned.
                videoList: Array.from(responseJson.items) // Transform response to Array
            })
        })
        .catch((error) => {
            console.error(error);
        })

    }
}