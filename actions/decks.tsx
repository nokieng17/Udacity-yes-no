export const TYPE_RECEIVE_DECK = "TYPE_RECEIVE_DECK"
export const TYPE_ADD_DECK = "TYPE_ADD_DECK"
export const TYPE_ADD_QUIZ_TO_DECK = "TYPE_ADD_QUIZ_TO_DECK"
export const TYPE_REMOVE_DECK = "TYPE_REMOVE_DECK"
export const TYPE_RESET_DECK = "TYPE_RESET_DECK"
// export const TPYE_ANSWER_QUIZ_OF_DECK = "TPYE_ANSWER_QUIZ_OF_DECK"


export interface IQuiz {
    question: string,
    answerText: string,
    answer: boolean | null
}

export interface IQuizArray extends Array<IQuiz> { }

export interface IDeckItem {
    key: string,
    title: string,
    questions?: IQuizArray
}

export interface IDecks {
    [key: string]: IDeckItem
}

const receiveDeck = (decks: IDecks): { type: string, decks: IDecks } => {
    return {
        type: TYPE_RECEIVE_DECK,
        decks
    }
}

const addDeck = (deck: IDeckItem) => {
    return {
        type: TYPE_ADD_DECK,
        deck
    }
}

const addQuizToDeck = (deckId: string, quiz: IQuiz) => {
    return {
        type: TYPE_ADD_QUIZ_TO_DECK,
        deckId,
        quiz
    }
}

const removeDeck = (key: string) => {
    return {
        type: TYPE_REMOVE_DECK,
        key
    }
}

const resetDeck = (key: string) => {
    return {
        type: TYPE_RESET_DECK,
        key
    }
}
// const answerQuiz = (deckId: string, index: number, answer: boolean) => {
//     return {
//         type: TPYE_ANSWER_QUIZ_OF_DECK,
//         index,
//         answer
//     }
// }

export const handleReceiveDecks = (decks: IDecks) => {
    return (dispatch) => {
        dispatch(receiveDeck(decks))
    }
}

export const handleAddDeck = (deck: IDeckItem) => {
    return (dispatch) => {
        //save to database
        dispatch(addDeck(deck))
    }
}

export const handleAddQuizToDeck = (deckId: string, quiz: IQuiz) => {
    return (dispatch) => {
        //save quiz to database
        dispatch(addQuizToDeck(deckId, quiz))
    }
}

export const handleRemoveDeck = (deck: IDeckItem) => {
    return dispatch => {
        //remove deck from database
        dispatch(removeDeck(deck.key));
    }
}

export const handleRestDeck = (key: string) => {
    return dispatch => {
        dispatch(resetDeck(key))
    }
}

// export const handleAnswerQuizOfDeck = (deckId: string, index: number, answer: boolean) => {
//     return dispatch => {
//         dispatch(handleAnswerQuizOfDeck(deckId, index, answer))
//     }
// }