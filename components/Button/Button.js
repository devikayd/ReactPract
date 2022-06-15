import { Pressable, Text, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({ children, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.text}>{children}</Text>

        </Pressable>
    )
}

export default Button


const styles = StyleSheet.create({

    button: {
        width: 150,
        marginLeft:105,
        padding: 10,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor:'#d4a373'
    },
    pressed: {
        opacity: 0.7
    },
    text:{
        color:'#344e41',
       

    }
})