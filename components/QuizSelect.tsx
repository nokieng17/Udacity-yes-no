import React from "react"
import { View, Text, StyleSheet } from "react-native";
import ButtonYesNo from "./ButtonYesNo";
import Colors from "../constants/Colors";
import { IQuiz } from "../actions/decks";
import ButtonText from "./ButtonText";

interface FormProps {
    style?: any,
    currentQuiz: number,
    totalQuiz: number,
    quiz: IQuiz,
    onAnswer: (answer: boolean) => void,
    onFlip: () => void
}

const QuizSelect = (props: FormProps) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <Text>{`${props.currentQuiz + 1} / ${props.totalQuiz}`}</Text>
            </View>
            <View style={props.style}>
                <View style={styles.subContainer}>
                    <View style={[styles.center, { flex: 1 }]}>
                        <Text style={styles.title}>{props.quiz.question}</Text>
                    </View>
                    <View style={[styles.center, { flex: 1 }]}>
                        <Text style={styles.subTitle}>{props.quiz.answerText}</Text>
                    </View>
                    <View style={[styles.center, { flex: 1 }]}>
                        <Text style={{ color: "red", marginBottom: 30 }}>Answer</Text>
                        <ButtonYesNo buttonText="Correct" positive={true} onPress={() => props.onAnswer(true)} />
                        <ButtonYesNo buttonText="Incorrect" positive={false} onPress={() => props.onAnswer(false)} />
                    </View>
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <ButtonText onPress={() => props.onFlip()}>Show Answer</ButtonText>
                </View>
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        flex: 2,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: Colors.secondaryText
    },
    subTitle: {
        fontSize: 24,
        color: Colors.secondaryText
    }
})

export default QuizSelect;