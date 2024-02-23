import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/User/Login'
import Signup from './src/screens/User/Signup'
import DescriptionScreen from './src/screens/Main/DescriptionScreen';
import FocusPointingScreen from './src/screens/Main/FocusPointingScreen';
import Image2VideoScreen from './src/screens/Main/Image2VideoScreen';
import { RecoilRoot } from 'recoil';
import ReviewScreen from './src/screens/Main/ReviewScreen';
import HomeScreen from './src/screens/Main/HomeScreen';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            */}

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