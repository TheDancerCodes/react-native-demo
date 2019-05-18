import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

export class BlogDetail extends React.Component {
    
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { postLoaded: false };
    };

    componentDidMount() {
        let blogId = this.props.navigation.getParam('blogId', 'NO BLOG');
        return fetch(`https://public-api.wordpress.com/rest/v1.1/sites/afroguitarhero.wordpress.com/posts/${blogId}`)
        .then((response) => response.json())
        .then((responseJson) => { // Grab promise returned from the json method.
            this.setState({
                postLoaded: true,
                postTitle: responseJson.title,
                postImage: responseJson.featured_image,
                postContent: responseJson.content,
                postID: responseJson.ID
            });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    // Navigates back to the blog component
    goBack=()=>{
        this.props.navigation.navigate('BlogRT');
    }

    render() {
        const blogTagStyles = {
            img: { display: 'none' },
        };

        const blogClassStyles = {
            blTitle: { marginLeft: 'auto', marginRight: 'auto' },
            blContent: { marginLeft: 10, marginRight: 10 },
            blBack: { marginLeft: 'auto', marginRight: 'auto', paddingBottom: 20 }
        }

        // Variable that holds the HTML
        let postDetails = `
            <div class="blTitle">
                <h1>${this.state.postTitle}</h1>
            </div>

            <div class="blContent">
                ${this.state.postContent}
            </div>

            <div class="blBack">
                <a href=${this.state.postID} style="textDecorationLine: none; color: #000000">
                    <h2>GO BACK</h2>
                </a>
            </div>
        `;

        return (
            <View style={{ paddingTop: 30 }}>
                { this.state.postLoaded && (
                    <ScrollView>
                        <Image 
                            style={{ width: '100%', height: 200 }}
                            source={{ uri: this.state.postImage }}
                        />
                        <HTML 
                            html={postDetails}
                            tagStyles={blogTagStyles}
                            classesStyles={blogClassStyles}
                            onLinkPress={()=> this.goBack()}
                        />
                    </ScrollView>
                )}

                {/* View displayed before blog data is loaded */}
                { !this.state.postLoaded && (
                    <View style={{ paddingTop: 20, alignItems: 'center' }}>
                        <Text> LOADING </Text>
                    </View>
                )}
            </View>
        );
    }
}