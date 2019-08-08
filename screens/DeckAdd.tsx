import React from "react";
import { connect } from "react-redux"
import { View, TextInput, StyleSheet, Platform } from "react-native"
import Colors from "../constants/Colors";
import ButtonYesNo from "../components/ButtonYesNo";
import { IDeckItem, handleAddDeck } from "../actions/decks";

interface FormProps {
    addDeck: (decks: IDeckItem) => void,
    navigation: any
}

class DeckAdd extends React.Component<FormProps> {

    state = {
        title: ""
    }

    handleDeckSubmit = () => {
        const { title } = this.state
        const deck: IDeckItem = {
            key: title.toLowerCase().replace(/ /g, ''),
            title
        }
        //save into db

        //update reducer
        this.props.addDeck(deck)

        //navigate to home
        this.props.navigation.goBack()
    }

    render() {
        const { title } = this.state
        return (
            <View style={styles.container}>
                <View style={{ alignSelf: "stretch" }}>
                    <TextInput placeholder="Deck Title" style={styles.input} value={title} onChangeText={text => this.setState({ title: text })} />
                </View>
                <View style={{ marginTop: 50 }}>
                    <ButtonYesNo positive={true} buttonText={"Submit"} onPress={this.handleDeckSubmit} disabled={"" === title} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        padding: 10,
        height: 44,
        borderColor: Colors.secondaryText,
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 8 : 3
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        addDeck: (deck: IDeckItem) => dispatch(handleAddDeck(deck))
    }
}

export default connect(null, mapDispatchToProps)(DeckAdd);