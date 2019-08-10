import { TYPE_RECEIVE_DECK, TYPE_ADD_DECK, TYPE_ADD_QUIZ_TO_DECK, IDecks, TYPE_REMOVE_DECK, TYPE_RESET_DECK } from '../actions/decks'

const decks = (state: IDecks = {}, action) => {
    switch (action.type) {
        case TYPE_RECEIVE_DECK:
            return {
                ...state,
                ...action.decks
            }

        case TYPE_ADD_DECK:
            return {
                ...state,
                [action.deck.key]: { ...action.deck, questions: [] }
            }

        case TYPE_ADD_QUIZ_TO_DECK:
            const { deckId, quiz } = action
            return {
                ...state,
                [state[deckId].key]: {
                    ...state[deckId],
                    questions: [...state[deckId].questions, quiz]
                }
            }

        case TYPE_REMOVE_DECK:
            const { key } = action;
            if (key) {
                delete state[key]
            } else {
                console.warn("key was not found", key)
            }
            return destructRemove(key, state)

        case TYPE_RESET_DECK:
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    questions: state[action.key].questions.map(quiz => ({ question: quiz.question, answer: null }))
                }
            }

        // case TPYE_ANSWER_QUIZ_OF_DECK:
        //     return {
        //         ...state,
        //         [action.deckId]: {
        //             ...state[action.deckId],
        //             questions: () => {
        //                 let questions = state[action.deckId].questions
        //                 questions[action.index] = { ...questions[action.index], answer: action.answer }
        //                 return questions
        //             }
        //         }
        //     }
        default:
            return state;
    }
}

const destructRemove = (keyRemove, decks) => {
    const { [keyRemove]: omit, ...rest } = decks
    return rest
}

export default decks