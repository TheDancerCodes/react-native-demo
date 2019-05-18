import React from 'react';
import { Text, View, FlatList } from 'react-native';
import HTML from 'react-native-render-html';

// Blog Component
export class Blog extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        
        // Use this to determine what to render as we wait for data loaded from WordPress.
        this.state = { blogLoaded: false };
    }

    // Since we are loading data from a remote source, we use the componentDidMount() method
    componentDidMount(){
        return fetch('https://public-api.wordpress.com/rest/v1.1/sites/afroguitarhero.wordpress.com/posts')
        .then((response) => response.json()) // Use json method to parse the data
        .then((responseJson) => {
            this.setState({ // Take response and transform into an array
                blogLoaded: true,
                blogList: Array.from(responseJson.posts)
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // chooseBlog method that navigates to the selected blog post
    chooseBlog = (blogID)=>{
        this.props.navigation.navigate( 'BlogDetailRT', {blogId: blogID} );
    }

    render() {
        return(
            <View>
                {/* Conditional render that displays when our data is loaded */}
                { this.state.blogLoaded && (
                    <View style={{ paddingTop: 40 }}>
                        <FlatList 
                            data={ this.state.blogList }
                            keyExtractor={(item, index) => item.ID.toString()} // FlatList expects key to be a string
                            renderItem={({item}) => 
                                <BlogItem
                                    id={item.ID}
                                    title={item.title}
                                    imageSrc={item.featured_image}
                                    excerpt={item.excerpt}
                                    choosePost={this.chooseBlog} // Use this prop to pass the id of the chosen post to the blog module
                                />
                            }
                        />
                    </View>
                )}

                {/* Conditional render that displays before our data is loaded */}
                { !this.state.blogLoaded && (
                    <View style={{ paddingTop: 30 }}>
                        <Text> LOADING </Text>
                    </View>

                )}

            </View>
        );
    }
}

// BlogItem Component
export class BlogItem extends React.Component {

    // Method that is executed when a post is selected.
    // This method uses the choosePost prop to pass the id to the Blog component.
    blogChoice=()=>{
        this.props.choosePost(this.props.id)
    }

    render() {
        
        // Back ticks because we are using a template literal. 
        // Besides embedding expressions in a string, we can make it multi-line.
        let blogItems = `
        <a href=${this.props.id} style="textDecorationLine: none; color: #000000; textAlign: center">
            <img src=${this.props.imageSrc} />
            <h1>${this.props.title}</h1>
            ${this.props.excerpt}
        </a>
        `;

        return (
            <View style={{ borderBottomWidth: 2, borderBottomColor: '#000000', borderStyle: 'solid' }}>
                <HTML html={blogItems} onLinkPress={()=> this.blogChoice()} />
            </View>

        );
    }
}
