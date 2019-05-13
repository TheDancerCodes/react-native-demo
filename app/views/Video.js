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
        return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key={API-KEY-GOES-HERE}')
        .then((response) => response.json())
        .then((responseJson)=> {
            this.setState({
                listLoaded: true, // Data successfully returned.
                videoList: Array.from(responseJson.items) // Transform response to Array
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return(
            <View>
                {/* Wrapping our component with a conditional,
                    Checking whether listLoaded state is true. */}
                { this.state.listLoaded && (
                    <View style={{ paddingTop: 30 }}>
                        <FlatList 
                            data={ this.state.videoList }
                            
                            // renderItem prop passes each item in the array the renderedItem 
                            // so that we can display the desired information about it.
                            renderItem={({item}) => 

                            // Component used as the rendered item.
                                <TubeItem
                                    navigate = {navigate}
                                    id={item.id.videoId}
                                    title={item.snippet.title}
                                    imageSrc={item.snippet.thumbnails.high.url}
                                />
                            }    
                        />
                    </View>
                )}

                {/* Conditional Render when data hasn't been laoded */}
                { !this.state.listLoaded && (
                    <View style={{ paddingTop: 30 }}>
                        <Text> LOADING... </Text>
                    </View>
                )}

            </View>
        );
    }
}

// Add component we will use to display videos in our list. 
// Normally this component would be in its own file.
export class TubeItem extends React.Component {

    // Method to deal with user touching a video
    onPress = () => {
        this.props.navigate('VideoDetailRT', {youTubeId: this.props.id});
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={{ paddingTop: 20, alignItems: 'center'}}>
                    <Image
                        style={{ width: '100%', height: 200 }}
                        source={{ uri: this.props.imageSrc }}
                    />
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}