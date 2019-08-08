import React from "react"
import { connect } from "react-redux";
import { View, Text, StyleSheet, Platform } from 'react-native'
import Colors from "../constants/Colors";
import { IDeckItem } from "../actions/decks";

interface FormProps {
    deck: IDeckItem,
    state: any,
    navigation: any
}


const DeckItem = (props: FormProps) => {
    const { questions = [], title } = props.deck
    return (
        <View style={styles.center}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{questions.length} Cards</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: Platform.OS === "ios" ? 9 : 3,
        margin: 5,
        backgroundColor: "white"
    },
    title: {
        fontSize: 44,
        fontWeight: "bold",
        color: Colors.secondaryText
    },
    subTitle: {
        fontSize: 24,
        color: Colors.secondaryText
    }
})

export default connect()(DeckItem);