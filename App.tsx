import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/User/Login'
import Signup from './src/screens/User/Signup'
import MainScreen from './src/screens/Main/MainScreen';
import DescriptionScreen from './src/screens/Main/DescriptionScreen';
import FocusPointingScreen from './src/screens/Main/FocusPointingScreen';
import Image2VideoScreen from './src/screens/Main/Image2VideoScreen';
import { RecoilRoot } from 'recoil';
import ScanImage from './src/components/Main/Crop/ScanImage';
import NDescriptionScreen from './src/screens/Main/NDescriptionScreen';
import ReviewScreen from './src/screens/Main/ReviewScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
           */}
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="ScanImage" component={ScanImage} /> 
          <Stack.Screen name='NDescriptionScreen' component={NDescriptionScreen} />
          <Stack.Screen name="FocusPointingScreen" component={FocusPointingScreen} />
          <Stack.Screen name="Image2VideoScreen" component={Image2VideoScreen} />
          <Stack.Screen name="ReviewScreen" component={ReviewScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App 