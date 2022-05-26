import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlaceForm = () => {

    const [textInput, setTextInput] = useState('');

    function textInputHandler(textInput) {
        setTextInput(textInput);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.textContainer}>Title</Text>
                <TextInput onChangeText={textInputHandler} value={textInput} style={styles.inputField} />
            </View>
            <ImagePicker/>
            <LocationPicker/>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    form: {
        flex: 1,
        padding: 24
    },
    textContainer: {
        fontSize: 18,
        color: '#d4a373',
        fontWeight: 'bold',
        marginBottom: 12
    },
    inputField: {
        borderBottomColor: '#d4a373',
        borderBottomWidth: 2,
        backgroundColor: '#b5e48c',
        fontSize: 16,
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
    }
})
export default PlaceForm