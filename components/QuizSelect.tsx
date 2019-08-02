import React from "react"
import { View, Text, StyleSheet } from "react-native";
import ButtonYesNo from "./ButtonYesNo";
import ButtonText from "./ButtonText";
import Colors from "../constants/Colors";

interface FormProps {
    onFlip: () => void,
    style: any,
    quizIndicator: string,
    title: string
}

const QuizSelect = (props: FormProps) => {
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
                    <ButtonYesNo buttonText="Correct" positive={true} />
                    <ButtonYesNo buttonText="Incorrect" positive={false} />
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <ButtonText onPress={props.onFlip}>Flip Card</ButtonText>
                </View>
            </View>
        </View >
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

export default QuizSelect;