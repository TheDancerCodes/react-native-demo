import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export class Question extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: false, // Determines whether or not an answer has been chosen
            correct: false // Determines whether of not the answer is correct.
        }
    }

    // Pass selected answer to this method and determine whether it is correct
    chooseAnswer=(ans)=>{
        let worth = 25;

        // if statement to compare answer to the correct answer prop
        if (ans === this.props.correctAnswer) {
            this.setState({ // Disables question & set question background to green
                selected: true,
                correct: true
            });
            this.props.scoreUpdate(0); // Since this is the correct answer, we don't deduct.
        }
        else { // When question is answered incorrectly
            this.setState({
                selected: true
            });
            this.props.scoreUpdate(worth); // Deduct by amount worth for a wrong answer.
        }
    }
    render() {
        return (
            <View style={styles.container}>

                {/* Conditional render that applies to the view before a question has been answered */}
                { !this.state.selected && (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>{this.props.question}</Text>

                        <TouchableHighlight underlayColor='#d3d3d3' onPress={() => this.chooseAnswer('answer1')}>
                            <Text style={styles.answerText}>{this.props.answer1}</Text>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='#d3d3d3' onPress={() => this.chooseAnswer('answer2')}>
                            <Text style={styles.answerText}>{this.props.answer2}</Text>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='#d3d3d3' onPress={() => this.chooseAnswer('answer3')}>
                            <Text style={styles.answerText}>{this.props.answer3}</Text>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='#d3d3d3' onPress={() => this.chooseAnswer('answer4')}>
                            <Text style={styles.answerText}>{this.props.answer4}</Text>
                        </TouchableHighlight>

                    </View>
                )}

                {/* Conditional render for when a user selects the correct answer */}
                { this.state.selected && this.state.correct && (
                    <View style={styles.correctContainer}>
                        <Text style={styles.questionText}>{this.props.question}</Text>
                        <Text style={styles.answerText}>{this.props.answer1}</Text>
                        <Text style={styles.answerText}>{this.props.answer2}</Text>
                        <Text style={styles.answerText}>{this.props.answer3}</Text>
                        <Text style={styles.answerText}>{this.props.answer4}</Text>
                        <Text style={styles.answerText}>CORRECT</Text>
                    </View>
                )}

                {/* Conditional render for when a user selects the incorrect answer */}
                { this.state.selected && !this.state.correct && (
                    <View style={styles.wrongContainer}>
                        <Text style={styles.questionText}>{this.props.question}</Text>
                        <Text style={styles.answerText}>{this.props.answer1}</Text>
                        <Text style={styles.answerText}>{this.props.answer2}</Text>
                        <Text style={styles.answerText}>{this.props.answer3}</Text>
                        <Text style={styles.answerText}>{this.props.answer4}</Text>
                        <Text style={styles.answerText}>INCORRECT</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    correctContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#008000'
    },
    wrongContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#ff0000'
    },
    questionText: {
        flex: 2,
        padding: 15,
        fontSize: 20
    },
    answerText: {
        flex: 2,
        padding: 15,
        fontSize: 20,
        textAlign: 'center'
    }
});