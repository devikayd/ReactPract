import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';


import AllPlacesScreen from './screens/AllPlacesScreen';
import IconButton from './components/Button/IconButton';
import AddPlaces from './screens/AddPlaces'
import MapScreen from './screens/MapScreen'
import { init } from './utils/Database';

const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true)
      })
      .catch((err) => { console.log('error in db init', err) })
  }, []);

  if (!dbInitialized) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>

        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#d4a373' },
            headerTitleAlign: 'center',
            headerTintColor: '#344e41',
            contentStyle: { backgroundColor: '#caf0f8' },
          }}>

          <Stack.Screen name='All Places'
            component={AllPlacesScreen}
            options={({ navigation }) => ({
              title: 'All places',
              headerRight: ({ tintColor }) => (
                <IconButton icon='add' color={tintColor} size={24}
                  onPress={() => navigation.navigate('Add Places')} />
              )
            })}
          />

          <Stack.Screen name='Add Places'
            component={AddPlaces}
            options={{
              title: 'Add a place'
            }}
          />

          <Stack.Screen name='Map'
            component={MapScreen}
            options={{
              title: ' Select Location'
            }} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
