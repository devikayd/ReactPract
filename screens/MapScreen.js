import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Alert } from 'react-native'
import { useState, useLayoutEffect, useCallback } from 'react'

import IconButton from '../components/Button/IconButton';

const MapScreen = ({ navigation }) => {

  const [selectedLocationOnMap, setSelectedLocatioOnMap] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  function selectLocationHandeler(event) {

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocatioOnMap({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {

    if (!selectedLocationOnMap) {
      Alert.alert('No location selected', 'Pick a location first');
      return;
    }
    navigation.navigate('Add Places', {
      pickedLat: selectedLocationOnMap.lat,
      pickedLng: selectedLocationOnMap.lng
    });
  },[navigation, selectedLocationOnMap]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) =>
        <IconButton color={tintColor} size={24} icon='save' onPress={savePickedLocationHandler} />
    })
  }, [navigation, savePickedLocationHandler])

  return (
    <MapView initialRegion={region} onPress={selectLocationHandeler} style={styles.map}>
      {selectedLocationOnMap && (
        <Marker coordinate={{ latitude: selectedLocationOnMap.lat, longitude: selectedLocationOnMap.lng }} 
        title='Picked Location' />
      )}
    </MapView>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})