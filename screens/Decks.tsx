import React from "react"
import { connect } from "react-redux"
import { View, FlatList, Animated } from 'react-native'
import DeckItem from "../components/DeckItem";
import { TouchableHighlight } from "react-native-gesture-handler";
import { IDecks, IDeckItem, handleReceiveDecks } from "../actions/decks";
import * as API from "../_API";
import { AppLoading } from "expo";
import ButtonTextOutline from "../components/ButtonTextOutline";
import Colors from "../constants/Colors";

interface FormProps {
    decks: IDecks,
    navigation: any
    receiveDecks: (decks: IDecks) => void
}

class Decks extends React.Component<FormProps> {

    state = {
        isReady: false,
        fadeValues: []
    }

    componentDidMount() {
        API.getAllDecks().then(decks => {
            this.props.receiveDecks(decks)
            this.setState({ isReady: true })
        })
    }
    componentWillReceiveProps(nextprops: FormProps) {
        if (Object.keys(nextprops.decks).length !== Object.keys(this.props.decks).length) {
            this.setFadeValues(nextprops.decks)
        }
    }

    setFadeValues = (decks: IDecks) => {
        let fadeValues = {}
        Object.keys(decks).map((key) => {
            fadeValues[key] = new Animated.Value(1)
        })
        this.setState({ fadeValues })
    }

    fadeOut(key: string, callBack: () => void) {
        Animated.timing(          // Animate over time
            this.state.fadeValues[key], // The animated value to drive
            {
                toValue: 0,           // Animate to opacity: 1 (opaque)
                duration: 200,       // 2000ms
            }
        ).start(() => {
            Animated.timing(          // Animate over time
                this.state.fadeValues[key], // The animated value to drive
                {
                    toValue: 1,           // Animate to opacity: 1 (opaque)
                    duration: 100,       // 2000ms
                }
            ).start()
            callBack()
        });                // Starts the animation
    }

    handleClick = (deck: IDeckItem) => {
        this.props.navigation.navigate("Deck",
            {
                deckKey: deck.key,
                title: deck.title
            })
    }

    handleGoAddDeck = () => {
        this.props.navigation.navigate("DeckAdd")
    }

    RowRender = (deck: IDeckItem) => {
        return (
            <Animated.View style={{ opacity: this.state.fadeValues[deck.key] }}>
                <TouchableHighlight onPress={() => this.fadeOut(deck.key, () => this.handleClick(deck))} underlayColor={Colors.primaryLight}>
                    <View key={deck.key}>
                        <DeckItem
                            deck={deck}
                        />
                    </View>
                </TouchableHighlight>
            </Animated.View>
        )
    }

    render() {
        const { isReady } = this.state
        if (!isReady) {
            return (
                <AppLoading />
            )
        }
        const { decks } = this.props
        if (!decks || Object.keys(decks).length <= 0) {
            return (
                <ButtonTextOutline buttonText="Add Deck" onPress={() => this.handleGoAddDeck()} />
            )
        }
        const arrayDecks = Object.keys(decks).map((key) => ({ ...decks[key] }))
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