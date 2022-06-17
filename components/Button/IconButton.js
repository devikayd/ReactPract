import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable,StyleSheet} from 'react-native'

const IconButton = ({ icon, size, color, onPress }) => {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}>
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    },
    button: {
        padding: 8,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

