import { FlatList, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PlacesItem from './PlacesItem'

function PlaceList({ places }) {

    const navigation = useNavigation();

    function selectPlaceHandler(id){
        navigation.navigate('Place Detailes',{placeId: id})
    }

    if (!places || places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.textContainer}>
                    No places to show.. start adding some places
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlacesItem place={item} onSelect = {selectPlaceHandler} />}
        />
    )
}


export default PlaceList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alighItems: 'center'
    },
    textContainer:{
        fontSize: 15
    },
    list: {
        margin: 24,
      },
})