import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from './Button/Button';
import { Place } from '../models/Place';

const PlaceForm = ({ onCreatePlace }) => {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) => {
       
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
      
        onCreatePlace(placeData);
    }



    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.textContainer}>Title</Text>
                <TextInput onChangeText={changeTitleHandler}
                    value={enteredTitle} style={styles.inputField} />
            </View>
            {/* passing data from image picker and location picker  */}
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler} >Add Place</Button>
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