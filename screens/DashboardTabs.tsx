import React from 'react';
import { View, Text, Platform } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import Decks from './Decks';
import DeckAdd from './DeckAdd';

const router = {
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) =>
                Platform.OS === 'ios' && <IconWithBadge name="smileo" size={30} color={tintColor} badgeCount={10} />,
        },
    },
    DeckAdd: {
        screen: DeckAdd,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) =>
                Platform.OS === 'ios' && <MaterialIcons name="note-add" size={30} color={tintColor} />,
        },
    },
};

const navigationOptions = {
    tabBarOptions: {
        showIcon: true,
        activeTintColor: Platform.OS === 'ios' ? Colors.primaryDark : "white",
        style: {
            padding: 10,
            height: Platform.OS === 'ios' ? 60 : 'auto',
            fontSize: 18,
            backgroundColor: Platform.OS === 'ios' ? "white" : Colors.primaryDark,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        },
    },
};

interface IIconBadgeProps {
    name: string,
    badgeCount: number,
    color: string,
    size: number,
}

class IconWithBadge extends React.Component<IIconBadgeProps> {

    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <AntDesign name={name} size={size} color={color} />
                {badgeCount > 0 && (
                    <View
                        style={{
                            // /If you're using react-native < 0.57 overflow outside of the parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {badgeCount % 9 < 1 && badgeCount}
                            {badgeCount % 9 >= 1 && "9+"}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}


const DashboardTabs =
    Platform.OS === 'ios'
        ? createBottomTabNavigator(router, navigationOptions)
        : createMaterialTopTabNavigator(router, navigationOptions);

export default createAppContainer(DashboardTabs);