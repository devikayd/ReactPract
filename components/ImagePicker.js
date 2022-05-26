import { View, Text, Button, Alert, Image, StyleSheet } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from 'react';


const ImagePicker = () => {

  // for ios stumulator ...import useCameraPermissions and PermissionStatus hooks

  const [cameraPermissionInformation, requestpermisssion] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();


  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestpermisssion();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permission', 'You need to grant Permission to use this app');
      return false;
    }
    return true;
  }


  async function imagePickerHander() {

    // checking permission for ios

    const hasPermisssion = await verifyPermission();

    if (!hasPermisssion) {
      return;
    }
    // for android

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.6
    })

    setPickedImage(image.uri)
  }

  let imagePicked = <Text > No image is Taken yet </Text>

  if (pickedImage) {
    imagePicked = <Image style={styles.imagePreview} source={{ uri: pickedImage }} />
  }

  return (
    <View >
      <View style={styles.noImage }>
        {imagePicked}
      </View>
      <Button title="Take Image" onPress={imagePickerHander} />
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  noImage: {
    height: 200,
    width: 400,
    marginTop:10,
    backgroundColor:'#b5e48c',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginBottom:10,
  },
  imagePreview:{
    height: 200,
    width: 400,
    borderRadius:5,
  }
})