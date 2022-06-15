import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from './Button/Button';
import { Places } from '../models/Places';

const PlaceForm = () => {

    const [textInput, setTextInput] = useState('');
    const [takedImage, setTakedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function textInputHandler(textInput) {
        setTextInput(textInput);
    }

    function savePlaceFormHandler() { 
         const placeData = new Places(textInput, takedImage, pickedLocation)
    }

    function takeImageHandler(imageUri) {
        setTakedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }
    )


    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.textContainer}>Title</Text>
                <TextInput onChangeText={textInputHandler} value={textInput} style={styles.inputField} />
            </View>
            {/* passing data from image picker and location picker  */}
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceFormHandler} >Add Place</Button>
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