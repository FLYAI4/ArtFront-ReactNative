import { View, Text, Button } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/User/Login'
import Signup from './src/screens/User/Signup'
import MainScreen from './src/screens/Main/MainScreen';
import Coordinates from './src/components/Main/FocusPointing/Coordinates';

const App = () => {
  const Stack = createNativeStackNavigator();


  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default App 