import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { QuizData } from '../data/QuizQuestions.js';
import { Questions } from '../sections/Questions.js';

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

}