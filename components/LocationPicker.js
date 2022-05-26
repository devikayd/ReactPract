import { View, StyleSheet, Alert , Text} from 'react-native'
import React, {useState} from 'react'
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location'


import ButtonOutline from './Button/ButtonOutline'


const LocationPicker = () => {

    const [locationPermissionInformation, requestLocation] = useForegroundPermissions();
    // const[currentUserLocation, setCurrentUserLocation] = useState();

    async function verifyPermission(){
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
          const permissionResponse =  await requestLocation();
          return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permission', 'you need to grant location permissions to use this app');
            return false;
        }
        return true;
    }

        async function getUserLocation(){

            const hasPermission = await verifyPermission();

            if(! hasPermission){
                return;
            }
            
            const currentLocation = await getCurrentPositionAsync();
            // setCurrentUserLocation([currentLocation.latitude, currentLocation.longitude]);
            console.log(currentLocation);
        }

        function getLocationOnMap(){

        }

  return (
    <View>
      <View style={styles.locPreview}>
          </View> 
      <View style={styles.buttons}>
          <ButtonOutline icon = 'location' color='#d4a373' size={24} onPress={getUserLocation} >
              Locate User
          </ButtonOutline>
          <ButtonOutline icon ='map' color='#d4a373' size={24} onpress={getLocationOnMap} > Pick On Map</ButtonOutline>
          
          </View> 
    </View>
  )
}

export default LocationPicker

const styles =StyleSheet.create({

    locPreview:{
        height: 200,
        width: 363,
        marginTop:10,
        backgroundColor:'#b5e48c',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        marginBottom:10,
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'center'
    }
})