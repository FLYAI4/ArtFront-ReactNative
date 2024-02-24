import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/User/LoginScreen'
import SignupScreen from './src/screens/User/SignupScreen'
import DescriptionScreen from './src/screens/Main/DescriptionScreen';
import FocusPointingScreen from './src/screens/Main/FocusPointingScreen';
import Image2VideoScreen from './src/screens/Main/Image2VideoScreen';
import { RecoilRoot, useRecoilState } from 'recoil';
import ReviewScreen from './src/screens/Main/ReviewScreen';
import HomeScreen from './src/screens/Main/HomeScreen';
import { QueryClient, QueryClientProvider } from 'react-query';
import StartScreen from './src/screens/User/StartScreen';

const queryClient = new QueryClient();

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>

            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />

            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name='DescriptionScreen' component={DescriptionScreen} />
            <Stack.Screen name="FocusPointingScreen" component={FocusPointingScreen} />
            <Stack.Screen name="Image2VideoScreen" component={Image2VideoScreen} />
            <Stack.Screen name="ReviewScreen" component={ReviewScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App 