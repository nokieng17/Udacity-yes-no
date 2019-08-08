import React from "react"
import { connect } from "react-redux"
import { View, FlatList } from 'react-native'
import DeckItem from "../components/DeckItem";
import { TouchableHighlight } from "react-native-gesture-handler";
import { IDecks, IDeckItem, handleReceiveDecks } from "../actions/decks";
import * as API from "../_API";
import { AppLoading } from "expo";

interface FormProps {
    decks: IDecks,
    navigation: any
    receiveDecks: (decks: IDecks) => void
}

class Decks extends React.Component<FormProps> {

    state = {
        isReady: false
    }

    componentDidMount() {
        API.getAllDecks().then(decks => {
            this.props.receiveDecks(decks)
            this.setState({ isReady: true })
        })
    }

    handleClick = (deck: IDeckItem) => {
        this.props.navigation.navigate("Deck",
            {
                deckKey: deck.key
            })
    }

    RowRender = (deck: IDeckItem) => (
        <TouchableHighlight onPress={() => this.handleClick(deck)}>
            <View key={deck.key}>
                <DeckItem
                    deck={deck}
                />
            </View>
        </TouchableHighlight>
    )

    render() {
        const { isReady } = this.state
        if (!isReady) {
            return (
                <AppLoading />
            )
        }
        const { decks } = this.props
        const arrayDecks = Object.keys(decks).map(function (key) {
            return { ...decks[key], key: key };
        });
        return (
            <FlatList
                data={arrayDecks}
                renderItem={({ item }) => this.RowRender(item)}
            />
        )
    }
}

const mapStateToProps = ({ decks }) => {
    return { decks }
}

const mapDispatchToProps = dispatch => {
    return {
        receiveDecks: (decks: IDecks) => dispatch(handleReceiveDecks(decks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);