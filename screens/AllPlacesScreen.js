import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState} from 'react';
import PlaceList from '../components/PlaceList'

const AllPlacesScreen = ({route}) => {

  const [ locatedPlace, setLocatedPlace] = useState([]);

  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused && route.params){
      setLocatedPlace ( currentplace => [...currentplace, route.params.place])
    }
  },[ isFocused, route])
  
  return (
    
      <PlaceList places={locatedPlace} />
  )
}

export default AllPlacesScreen;

