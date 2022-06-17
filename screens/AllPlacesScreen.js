import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState} from 'react';

import PlaceList from '../components/PlaceList'

const AllPlacesScreen = ({route}) => {

  const [ loadedPlace, setLoadedPlace] = useState([]);

  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused && route.params){
      setLoadedPlace ( (currentplace ) => [...currentplace, route.params.place])
    }
  },[ isFocused, route])
  
  return (
    
      <PlaceList places={loadedPlace} />
  )
}

export default AllPlacesScreen;

