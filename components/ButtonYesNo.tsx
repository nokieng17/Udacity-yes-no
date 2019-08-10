import React from 'react'
import { Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native'
import Colors from '../constants/Colors';
import { Platform } from '@unimodules/core';

interface FormProps {
    buttonText?: string,
    onPress?: (e: GestureResponderEvent) => void,
    positive: boolean,
    disabled?: boolean
}

const ButtonYesNo = (props: FormProps) => {

    return (
        <TouchableOpacity
            style={[
                Platform.OS === "ios" ? styles.iosButton : styles.mdButton,
                { backgroundColor: props.disabled ? Colors.primaryLight : props.positive ? Colors.primary : Colors.secondary },
            ]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={styles.text}>{props.buttonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: Colors.primaryText,
        alignSelf: 'center',
        fontSize: 25,
    },
    iosButton: {
        width: 250,
        padding: 10,
        borderRadius: 7,
        height: 60,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignSelf: 'center',
        flexDirection: 'column',
    },
    mdButton: {
        width: 250,
        padding: 10,
        borderRadius: 2,
        height: 60,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignSelf: 'center',
        flexDirection: 'column',
    },
})

export default ButtonYesNo;