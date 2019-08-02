import React from "react"
import { View, Text, StyleSheet } from "react-native";
import ButtonTextOutline from "../components/ButtonTextOutline";
import ButtonYesNo from "../components/ButtonYesNo";
import ButtonText from "../components/ButtonText";
import Colors from "../constants/Colors";

const Deck = (props) => {

    return (
        <View style={[styles.center, { flex: 1 }]}>
            <View style={[styles.center, { flex: 1 }]}>
                <Text style={styles.title}>Title</Text>
                <Text style={styles.subTitle}>sub title</Text>
            </View>
            <View style={[styles.center, { flex: 1 }]}>
                <ButtonTextOutline children={"Add card"} />
                <ButtonYesNo buttonText={"start Quiz"} positive={true} />
            </View>
            <View style={[styles.center, { flex: 1 }]}>
                <ButtonText children={"Delete this deck!"} color={Colors.secondary} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 44,
        fontWeight: "bold",
        color: Colors.secondaryText
    },
    subTitle: {
        color: Colors.secondaryText,
        fontSize: 18,
        fontWeight: "100",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Deck;