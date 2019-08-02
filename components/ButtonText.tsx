import React from 'react'
import { Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native'
import Colors from '../constants/Colors';


interface FormProps {
    buttonText?: string,
    onPress?: (e: GestureResponderEvent) => void,
    children: string,
    color?: string
}

const ButtonText = (props: FormProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={[styles.text, { color: props.color ? props.color : Colors.primary }]}>{props.buttonText ? props.buttonText : props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white"
    },
    text: {
        color: Colors.primary
    }
})

export default ButtonText;