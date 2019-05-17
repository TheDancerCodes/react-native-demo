import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { QuizData } from '../data/QuizQuestions.js';
import { Questions, Question } from '../sections/Questions.js';

export class Quiz extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            questLoaded: false,
            totalScore: 100,
            completedQuiz: false
        };
    }

    // Since we are loading data from another file, we use the componentDidMount() method
    componentDidMount() {

        // Find out the number of questions.
        let numQuestions = Array.from(QuizData.questions).length

        this.setState({

            // Set questList state to questions that are returned
            questList: Array.from(QuizData.questions),
            questLoaded: true, // Used by conditional render tot determine what to display
            numberOfQuestions: numQuestions, // state that hold no. of questions.
            incorrect: 0, // state that tracks no. of incorrect answers.
            questionAnswered: 0 // state that tracks no. of answered questions.
        });
    }

    updateScore = (penalty)=> {
        let tempScore = this.state.totalScore;
        let missed = this.state.incorrect;
        let questionsTotal = this.state.numberOfQuestions;
        let questionsDone = this.state.questionAnswered;

        let newScore = tempScore - penalty;
        let totalAnswered = questionsDone + 1;
        let totalMissed = penalty ? missed + 1 : missed;

        this.setState({
            totalScore: newScore,
            incorrect: totalMissed,
            questionAnswered: totalAnswered
        })

        // Check whether quiz is finished
        if (totalAnswered === questionsTotal) {
            this.setState({
                completedQuiz: true
            })
        }
    }

    // Method that navigates to the QuizFinish Component 
    // (This component displays the score & other info after the quiz is completed.)
    finishQuiz=()=>{
        this.props.navigation.navigate(
            'FinishRT', {
                score: this.state.totalScore,
                missed: this.state.incorrect,
                questions: this.state.numberOfQuestions
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Conditional Render for View displayed when data has loaded */}
                { this.state.questLoaded && (
                    <FlatList
                        data={ this.state.questList }
                        renderItem = {({item}) =>
                            <Question 
                                question={item.question}
                                answer1={item.answer1}
                                answer2={item.answer2}
                                answer3={item.answer3}
                                answer4={item.answer4}
                                correctAnswer={item.correctAnswer}
                                scoreUpdate={this.updateScore}
                            />
                        }
                    />     
                )}

                {/* Conditional Render containing disabled button that displays until quiz is completed */}
                { !this.state.completedQuiz && (
                    <TouchableHighlight style={styles.disabled} >
                        <Text>Answer all the questions</Text>
                    </TouchableHighlight>
                )}

                {/* Button used to complete the quiz: Navigates to component thay displays the score */}        
                { this.state.completedQuiz && (
                    <TouchableHighlight onPress={this.finishQuiz} style={styles.enabled}>
                        <Text>Finished</Text>
                    </TouchableHighlight>
                )}

                {/* Conditional Render displaying LOADING message incase you have to wait for data to load */}
                { !this.state.questLoaded && (
                    <Text>LOADING</Text>
                )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    disabled:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        height: '10%'
    },
    enabled:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#90ee90',
        height: '10%'
    }
});