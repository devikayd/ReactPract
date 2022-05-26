import { View, Text, Image, Pressable } from 'react-native'

const PlacesItem = ({ place }) => {
  return (
    <Pressable>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>

    </Pressable>
  )
}

export default PlacesItem