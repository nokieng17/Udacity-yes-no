import React from "react"
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import ButtonTextOutline from "../components/ButtonTextOutline";
import ButtonYesNo from "../components/ButtonYesNo";
import ButtonText from "../components/ButtonText";
import Colors from "../constants/Colors";
import { IDeckItem, handleRemoveDeck } from "../actions/decks";
import { NavigationActions } from "react-navigation";

interface FormProps {
    deckKey: string,
    deck: IDeckItem,
    navigation: any,
    removeDeck: (deck: IDeckItem) => void,
    goBack: () => void
}


// component should update
class Deck extends React.Component<FormProps> {

    shouldComponentUpdate(nextProps: any) {
        const { deck } = this.props;
        return null !== nextProps && null !== nextProps.deck && deck !== nextProps.deck;
    }

    goAddCard = (key: string) => {
        this.props.navigation.navigate("QuizAdd", { id: key })
    }

    goStartQuiz = (key: string) => {
        this.props.navigation.navigate("Quiz", { id: key })
    }

    removeDeck = (deck: IDeckItem) => {

        this.props.removeDeck(deck)

        //remove from storage

        // this.props.navigation.goBack();
        this.props.goBack();
    }

    render() {
        const { deck } = this.props;
        if (!deck) {
            return (
                <View>
                    <Text>Deck was not found!</Text>
                </View>
            )
        }
        const { key, title, questions = [] } = deck
        return (
            <View style={[styles.center, { flex: 1 }]}>
                <View style={[styles.center, { flex: 1 }]}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{questions.length} Cards</Text>
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <ButtonTextOutline children={"Add card"} onPress={() => this.goAddCard(key)} />
                    <ButtonYesNo buttonText={"Start Quiz"} positive={true} onPress={() => this.goStartQuiz(key)} />
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <ButtonText children={"Delete this deck!"} color={Colors.secondary} onPress={() => this.removeDeck(deck)} />
                </View>
            </View>
        )
    }
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


const mapStateToProps = ({ decks }, { navigation }) => {
    const { deckKey } = navigation.state.params
    return {
        deckKey,
        deck: decks[deckKey]
    }
}

//dispatch and navigate back, only call goBack(), it just go back only, do not do any dispatch
const mapDispatchToProps = (dispatch, { navigation }) => {
    return {
        removeDeck: (deck: IDeckItem) => dispatch(handleRemoveDeck(deck)),
        goBack: () => navigation.dispatch(NavigationActions.back())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Deck);