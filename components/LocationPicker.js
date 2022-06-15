import { View, StyleSheet, Alert, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'


import ButtonOutline from './Button/ButtonOutline'
import { getAddress, getLocationPreview } from '../utils/Location'

const LocationPicker = ({ onPickLocation }) => {

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const [locationPermissionInformation, requestLocation] = useForegroundPermissions();
    const [pickedUserLocation, setPickedUserLocation] = useState();




    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            }
            setPickedUserLocation(mapPickedLocation)
        }
    }, [isFocused, route]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedUserLocation) {
                const address = await getAddress(pickedUserLocation.lat, pickedUserLocation.lng);
                onPickLocation({ ...pickedUserLocation, address: address });
            }
        }
        handleLocation();
    }, [onPickLocation, pickedUserLocation])

    async function verifyPermission() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestLocation();
            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission', 'you need to grant location permissions to use this app');
            return false;
        }
        return true;
    }

    async function getUserLocation() {

        const hasPermission = await verifyPermission();

        if (!hasPermission) {
            return;
        }

        const currentLocation = await getCurrentPositionAsync();

        setPickedUserLocation({
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude
        })

        console.log(currentLocation);
    }

    function getLocationOnMap() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text> No map to show. Select a locaion first. </Text>

    if (pickedUserLocation) {
        locationPreview = (
            <Image source={{ uri: getLocationPreview(pickedUserLocation.lat, pickedUserLocation.lng) }} />
        )
    }

    return (
        <View>
            <View style={styles.locPreview}>
                {locationPreview}
            </View>
            <View style={styles.buttons}>
                <ButtonOutline icon='location' color='#d4a373' size={24} onPress={getUserLocation} >
                    Locate User
                </ButtonOutline>
                <ButtonOutline icon='map' color='#d4a373' size={24} onPress={getLocationOnMap} > Pick On Map</ButtonOutline>

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
    }
})