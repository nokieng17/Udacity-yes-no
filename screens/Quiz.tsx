import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import QuizSelect from '../components/QuizSelect';
import QuizFlipped from '../components/QuizFlipped';

interface FormProps {
    title: string,
    quizIndicator: string
}

interface State {
    flipValue: any
}

class Quiz extends React.Component<FormProps> {

    state: State = {
        flipValue: new Animated.Value(0),
    }

    componentDidMount() {
    }

    flipCard = () => {
        const { flipValue } = this.state
        Animated.sequence([
            Animated.spring(flipValue, { toValue: 180, velocity: 8, friction: 10 })
        ]).start()
    }

    render() {
        const flipValue = this.state.flipValue;
        let flipValueFont = flipValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        let flipValueBack = flipValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
        })
        const frontAnimatedStyle = {
            transform: [
                { rotateY: flipValueFont }
            ],
            backfaceVisibility: "hidden",
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: flipValueBack }
            ],
            backfaceVisibility: "hidden",
        }
        return (
            <View style={styles.container}>
                <Animated.View style={[frontAnimatedStyle]}>
                    <QuizSelect
                        title={"Title"}
                        quizIndicator={"2/3"}
                        onFlip={this.flipCard}
                        style={[{
                            flex: 1,
                            backfaceVisibility: 'hidden'
                        }]}
                    />
                </Animated.View >
                {/* margin-top auto make the trick */}
                <Animated.View style={[backAnimatedStyle, { marginTop: "auto", }]}>
                    <QuizFlipped
                        title={"Title"}
                        quizIndicator={"2/3"}
                        onNextQuiz={this.flipCard}
                        style={[{
                            flex: 1,
                            backfaceVisibility: 'hidden'
                        }]} isCorrect={false}
                    />
                </Animated.View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default Quiz;