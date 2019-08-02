import React from "react"
import { View, Text, StyleSheet } from "react-native";
import ButtonTextOutline from "./ButtonTextOutline";
import Colors from "../constants/Colors";

interface FormProps {
    onNextQuiz: () => void,
    isCorrect: boolean,
    style: any,
    quizIndicator: string,
    title: string
}

const QuizFlipped = (props: FormProps) => {
    return (
        <View style={props.style}>
            <View style={{ padding: 10 }}>
                <Text>{props.quizIndicator}</Text>
            </View>
            <View style={styles.subContainer}>
                <View style={[styles.center, { flex: 1 }]}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <Text style={{ color: "red", marginBottom: 30 }}>Answer</Text>
                    <Text style={{ fontSize: 34, color: props.isCorrect ? Colors.primary : Colors.secondary }}> {props.isCorrect ? "Correct" : "Incorrect"}</Text>
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <ButtonTextOutline onPress={props.onNextQuiz}>Next Quiz</ButtonTextOutline>
                </View>
            </View>
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
        fontSize: 44,
        fontWeight: "bold",
        color: Colors.secondaryText
    }
})

export default QuizFlipped;