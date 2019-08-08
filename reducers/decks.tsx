import { TYPE_RECEIVE_DECK, TYPE_ADD_DECK, TYPE_ADD_QUIZ_TO_DECK, IDecks, TYPE_REMOVE_DECK } from '../actions/decks'

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
            return state
        default:
            return state;
    }
}

export default decks