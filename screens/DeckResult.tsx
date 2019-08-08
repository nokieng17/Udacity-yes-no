import React from "React";
import { View, Text, StyleSheet } from "react-native"
import Constants from "expo-constants";
import * as Progress from 'react-native-progress';
import ButtonTextOutline from "../components/ButtonTextOutline";
import Colors from "../constants/Colors";

interface FormProps {
    correct: number,
    total: number
}

const DeckResult = (props: FormProps) => {

    const { correct, total } = props;
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>Deck Title</Text>
            </View>
            <View style={styles.center}>
                <Text style={{ color: Colors.primary }}>Correct Answers</Text>

                <View style={{ alignSelf: 'stretch' }}>
                    <Progress.Bar progress={correct / total} width={null} style={{ margin: 10, alignSelf: 'stretch' }} animated={true} />
                </View>

                <Text style={{ color: Colors.primary, fontSize: 33 }}>{correct} / {total}</Text>
            </View>
            <View style={styles.center}>
                <ButtonTextOutline children={"Ok"} onPress={() => { }} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "space-around",
    },
    center: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 44,
        fontWeight: "bold",
        color: Colors.secondaryText
    }
})

export default DeckResult;