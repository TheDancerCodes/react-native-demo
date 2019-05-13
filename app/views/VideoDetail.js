import React from 'react';
import { Text, View } from 'react-native';

export class VideoDetail extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        let tubeId = this.props.navigation.getParam('youTubeId', 'NO VIDEO');
        return(
            <View style={{ paddingTop: 40 }}>
                <Text>{tubeId}</Text>
            </View>
        )
    }
}