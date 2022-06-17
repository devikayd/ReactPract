import React from 'react'
import PlaceForm from '../components/PlaceForm'
import { Places } from '../models/Places';

const AddPlaces = ({navigation}) => {

  function createPlaceHandler(place){
    navigation.navigate('All places', {place: place});
  }
  return (
    <PlaceForm onCreatePlace={createPlaceHandler} />
    
  )
}

export default AddPlaces