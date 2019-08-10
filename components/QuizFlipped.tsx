import React from "react"
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { IQuiz } from "../actions/decks";
import ButtonTextOutline from "./ButtonTextOutline";

interface FormProps {
    style: any,
    quiz: IQuiz,
    currentQuiz: number,
    totalQuiz: number,
    onNextQuiz: () => void
}

const QuizFlipped = (props: FormProps) => {
    return (
        <View style={props.style}>
            <View style={{ padding: 10 }}>
                <Text>{`${props.currentQuiz + 1} / ${props.totalQuiz}`}</Text>
            </View>
            <View style={styles.subContainer}>
                <View style={[styles.center, { flex: 1 }]}>
                    <Text style={styles.title}>{props.quiz.question}</Text>
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <Text style={styles.subTitle}>{props.quiz.answerText}</Text>
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <Text style={{ color: "red", marginBottom: 30 }}>Answer</Text>
                    <Text style={{ fontSize: 34, color: props.quiz.answer ? Colors.primary : Colors.secondary }}> {props.quiz.answer ? "Correct" : "Incorrect"}</Text>
                </View>
            </View>
            {
                props.currentQuiz + 1 >= props.totalQuiz ?
                    <View style={[styles.center, { flex: 1 }]}>
                        <ButtonTextOutline onPress={() => props.onNextQuiz()}>Finish</ButtonTextOutline>
                    </View>
                    :
                    <View style={[styles.center, { flex: 1 }]}>
                        <ButtonTextOutline onPress={() => props.onNextQuiz()}>Next Quiz</ButtonTextOutline>
                    </View>
            }
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

export default QuizFlipped;