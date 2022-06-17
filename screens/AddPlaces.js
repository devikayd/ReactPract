import PlaceForm from "../components/PlaceForm";
import { insertPlace } from "../utils/Database";


function AddPlace({ navigation }) {
  // inserting data into db
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate('All Places', {
      place: place
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;