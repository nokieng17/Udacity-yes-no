import { IDecks } from "./actions/decks";

const decks: IDecks = {

    // react: {
    //     title: 'React',
    //     key: "react",
    //     questions: [
    //         {
    //             question: 'What is React?',
    //             answerText: "What is a closure",
    //             answer: true
    //         },
    //         {
    //             question: 'Where do you make Ajax requests in React?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // },
    // javascript: {
    //     title: 'JavaScript',
    //     key: "javascript",
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // },
    // javascript2: {
    //     title: 'JavaScript2',
    //     key: "javascript2",
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // },
    // javascript3: {
    //     title: 'JavaScript3',
    //     key: "javascript3",
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // },
    // javascript4: {
    //     title: 'JavaScript4',
    //     key: "javascript4",
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // },
    // javascript5: {
    //     title: 'JavaScript5',
    //     key: "javascript5",
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // },
    // javascript6: {
    //     title: 'JavaScript6',
    //     key: "javascript6",
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // },
    // javascript7: {
    //     title: 'JavaScript7',
    //     key: "javascript7",
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // },
    // javascript8: {
    //     title: 'JavaScript8',
    //     key: "javascript8",
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answerText: "What is a closure",
    //             answer: true
    //         }
    //     ]
    // }
}

export const getAllDecks = () => {
    return new Promise<IDecks>((res, rej) => {
        setTimeout(() => {
            res(decks)
        }, 1000);
    })
}