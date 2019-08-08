import DashboardTabs from "./DashboardTabs"
import { connect } from "react-redux"
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Quiz from "./Quiz"
import QuizAdd from "./QuizAdd"
import Deck from "./Deck";
import Colors from "../constants/Colors";

const header = {
    headerTintColor: Colors.primaryText,
    headerStyle: {
        backgroundColor: Colors.primary,
    },
}

const StackNavs = {
    home: {
        screen: DashboardTabs,
        navigationOptions: {
            header: null,
        },
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({ navigation }) => (header),
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => (header),
    },
    QuizAdd: {
        screen: QuizAdd,
        navigationOptions: () => (header)
    }
}

export default connect()(createAppContainer(createStackNavigator(StackNavs)))