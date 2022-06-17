import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/PlaceList'
import { fetchPlaces } from '../utils/Database';

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);
  
  // useEffect(() => {
  //   if (isFocused && route.params) {
  //     setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
  //   }
  // }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;