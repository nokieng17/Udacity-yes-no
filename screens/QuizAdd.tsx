import React from "react"
import { connect } from "react-redux";
import { View, StyleSheet, TextInput, Text, Switch } from "react-native"
import Colors from "../constants/Colors";
import { Platform } from "@unimodules/core";
import ButtonYesNo from "../components/ButtonYesNo";
import { IQuiz, handleAddQuizToDeck } from "./../actions/decks"

interface State {
    title: string,
    answer: boolean
}

interface FormProps {
    deckId: string,
    addQuizToDeck: (deckId: string, quiz: IQuiz) => void,
    navigation: any
}

class QuizAdd extends React.Component<FormProps> {

    state = {
        title: "",
        answer: true
    }

    toggleAnswer = () => {
        this.setState((prev: State) => ({ answer: !prev.answer }))
    }

    submitQuizToDeck = () => {
        const { title, answer } = this.state
        const { deckId, addQuizToDeck } = this.props;

        addQuizToDeck(deckId, { question: title, answer })

        //update db

        this.props.navigation.goBack();

        // this.props.navigation.dispatch(NavigationActions.back({ key: 'QuizAdd' }))
    }

    render() {
        const { answer, title } = this.state
        const { deckId } = this.props
        if (null == deckId) {
            return (
                <View>
                    <Text>Deck was not found</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={{ alignSelf: "stretch" }}>
                    <TextInput placeholder="Card Title" style={styles.input} value={title} onChangeText={title => this.setState({ title })} />
                </View>
                <View style={{ marginTop: 50 }}>
                    <Text style={{ color: Colors.primary, fontSize: 15, marginBottom: 5 }}>Answer</Text>
                    <Switch
                        style={{ margin: 5 }}
                        value={answer}
                        thumbColor={Colors.primary}
                        trackColor={{ false: Colors.primary, true: Colors.secondary }}
                        onValueChange={this.toggleAnswer}
                    />
                    <Text style={{ color: answer ? Colors.primary : Colors.secondary }}>{answer ? "Correct" : "Incorrect"}</Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <ButtonYesNo positive={true} buttonText={"Submit"} onPress={this.submitQuizToDeck} disabled={"" === title} />
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

const mapStateToProps = ({ }, { navigation }) => {
    const { id = null } = navigation.state.params
    return {
        deckId: id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addQuizToDeck: (deckId: string, quiz: IQuiz) => dispatch(handleAddQuizToDeck(deckId, quiz))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizAdd);