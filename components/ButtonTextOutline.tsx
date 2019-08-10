import React from 'react'
import { Text, StyleSheet, TouchableOpacity, GestureResponderEvent, Platform } from 'react-native'
import Colors from '../constants/Colors';


interface FormProps {
    buttonText?: string,
    onPress?: (e: GestureResponderEvent) => void,
    children?: string
}
const ButtonTextOutline = (props: FormProps) => {
    return (
        <TouchableOpacity style={[styles.button, Platform.OS === "ios" ? styles.iosButton : styles.mdButton]} onPress={props.onPress}>
            <Text style={styles.text}>{props.buttonText ? props.buttonText : props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
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
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    iosButton: {
        borderRadius: 7,
    },
    mdButton: {
        borderRadius: 2,
    },
    text: {
        color: Colors.primary,
        alignSelf: 'center',
        fontSize: 25,
    }
})

export default ButtonTextOutline;