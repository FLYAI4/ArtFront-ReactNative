import { View, Text, Button } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/User/Login'
import Signup from './src/screens/User/Signup'
import UploadImage from './src/screens/Main/UploadImage';
import PlayVideo from './src/screens/Main/PlayVideo';

const App = () => {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="PlayVideo" component={PlayVideo} />
        <Stack.Screen name="UploadImage" component={UploadImage} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App