import { View, StyleSheet, Alert, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'


import ButtonOutline from './Button/ButtonOutline'
import { getAddress, getMapPreview } from '../utils/Location'

const LocationPicker = ({ onPickLocation }) => {

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng,
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                );
                onPickLocation({ ...pickedLocation, address: address });
            }
        }

        handleLocation();
    }, [pickedLocation, onPickLocation]);

    async function verifyPermissions() {
        if (
            locationPermissionInformation.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }


    let locationPreview = <Text>No location picked yet. select Location</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={styles.image}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }

    return (
        <View>
            <View style={styles.locPreview}>
                {locationPreview}
            </View>
            <View style={styles.buttons}>
                <ButtonOutline icon='location' color='#d4a373' size={24} onPress={getLocationHandler} >
                    Locate User
                </ButtonOutline>
                <ButtonOutline icon='map' color='#d4a373' size={24} onPress={pickOnMapHandler} >
                    Pick On Map
                </ButtonOutline>
            </View>
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({

    locPreview: {
        height: 200,
        width: 363,
        marginTop: 10,
        backgroundColor: '#b5e48c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    image: {
        height: 200,
        width: 363,
        borderRadius: 5,
    }
})