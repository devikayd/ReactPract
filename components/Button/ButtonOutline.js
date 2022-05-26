import { Ionicons } from '@expo/vector-icons'
import {Text, StyleSheet, Pressable} from 'react-native'


const ButtonOutline = ({children, onPress, color, size, icon}) => {
  return (
    <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress} >
        <Ionicons style={styles.icon} name={icon} color={color} size={size} />
        <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default ButtonOutline;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        paddingVertical:8,
        paddingHorizontal:12,
      },
    pressed:{
        opacity:0.7
    },
    icon:{
        marginRight:6
    },
    text:{
        color:'#d4a373',

    }
})