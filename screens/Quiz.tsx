import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import QuizSelect from "../components/QuizSelect";
import QuizFlipped from "../components/QuizFlipped";
import { handleRestDeck, IDeckItem, IQuiz } from "../actions/decks";
import CardFlip from "react-native-card-flip";
import Colors from "../constants/Colors";
import DeckResult from "./DeckResult";
import { NavigationActions } from "react-navigation";
import { clearLocalNotification, createNotification } from "../helpers/helpers";

interface FormProps {
    title: string;
    quizIndicator: string;
    deck: IDeckItem;
    // foo: () => void,
    goBack: () => void;
}

class Quiz extends React.Component<FormProps> {
    state = {
        currentQuiz: 0,
        correctAnswers: 0,
        flipped: false
    };

    card = null;
    componentDidMount() {
        clearLocalNotification().then(createNotification);
    }

    handleNextQuiz = () => {
        const { flipped } = this.state;
        if (flipped) {
            this.handleReverseCard();
        }
        this.setState((prev: { currentQuiz }) => ({
            currentQuiz: prev.currentQuiz + 1
        }));
    };

    handleFlipCard = () => {
        this.setState({ flipped: true });
        this.card.flip();
    };

    handleReverseCard = () => {
        this.setState({ flipped: false });
        this.card.flip();
    };

    handleAnswer = (answer: boolean, quiz: IQuiz) => {
        if (answer === quiz.answer) {
            const { correctAnswers } = this.state;
            this.setState({ correctAnswers: correctAnswers + 1 });
        }
        this.handleNextQuiz();
    };

    handleReset = () => {
        this.setState({ correctAnswers: 0, flipped: false, currentQuiz: 0 });
        // this.props.foo()
    };

    render() {
        const { currentQuiz } = this.state;
        const { deck } = this.props;
        const { questions = [] } = deck;
        if (currentQuiz >= questions.length) {
            //finished
            const { correctAnswers } = this.state;
            return (
                <DeckResult
                    title={deck.title}
                    correct={correctAnswers}
                    total={questions.length}
                    onRestart={() => this.handleReset()}
                    goBack={() => this.props.goBack()}
                />
            );
        }
        const quiz = questions[currentQuiz];
        return (
            <View style={styles.container}>
                <CardFlip
                    style={styles.cardContainer}
                    ref={card => (this.card = card)}
                >
                    <QuizSelect
                        style={[styles.card, styles.card1]}
                        quiz={quiz}
                        currentQuiz={currentQuiz}
                        totalQuiz={questions.length}
                        onAnswer={answer => this.handleAnswer(answer, quiz)}
                        onFlip={() => this.handleFlipCard()}
                    />
                    <QuizFlipped
                        quiz={quiz}
                        currentQuiz={currentQuiz}
                        totalQuiz={questions.length}
                        onNextQuiz={() => this.handleNextQuiz()}
                        style={[styles.card, styles.card2]}
                    />
                </CardFlip>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
        // borderColor: "red",
        // borderWidth: 1,
        // backgroundColor: '#F5FCFF',
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch"
    },
    cardContainer: {
        flex: 1,
        alignSelf: "stretch"
    },
    card: {
        flex: 1,
        borderRadius: 5,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5
    },
    card1: {
        backgroundColor: "white"
    },
    card2: {
        backgroundColor: Colors.secondaryLight
    }
});

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const mapStateToProps = ({ decks }, { navigation }) => {
    const { id } = navigation.state.params;
    return {
        deck: {
            ...decks[id],
            questions: [...shuffle(decks[id].questions)]
        }
    };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
    return {
        resetDeck: (key: string) => dispatch(handleRestDeck(key)),
        // foo: () => dispatch((dispatch) => { dispatch(() => { type: "FOO" }) }),
        goBack: () => navigation.dispatch(NavigationActions.back())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);
