import { View, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import AppText from '../../components/Common/Text/AppText'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import theme from '../../../theme'
import Splash from '../../components/Main/Loading/Splash'

const StartScreen = () => {
    const [splash, setSplash] = useState(true);
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const imageSource = require('../../assets/image/landing.png');

    const handleNavigation = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const userInfo = JSON.parse(userData)
        if (userInfo && userInfo.id && userInfo.token) {
          navigation.push('HomeScreen');
          return;
        }
      } else {
        navigation.push('LoginScreen')
      }
      
      navigation.push('LoginScreen')
    }

    if (splash) {
      return (<Splash setSplash={setSplash} />)
    }

  return (
    <View style={{backgroundColor: theme.backgroundWhite, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Image source={imageSource} style={{width: 250, height: 400, resizeMode: 'contain'}} />
      
      <View style={{marginVertical:40, display: 'flex', alignItems: 'center'}}>
        <AppText style={{fontSize: 40, color: theme.olive, fontWeight: '700', marginBottom: 8, }}>Acent</AppText>
        <AppText style={{fontSize: 16, color: theme.olive}}>당신만의 AI 도슨트를 만나보세요</AppText>
      </View>
      <TouchableOpacity onPress={handleNavigation}>
          <View style={{borderRadius: 55, overflow: 'hidden'}}>
              <AppText style={{ width: 'auto', paddingVertical: 12, paddingHorizontal:40, backgroundColor: theme.olive, color: theme.backgroundWhite, fontWeight: '600', fontSize: 20, textAlign: 'center', }}>갤러리 방문하기</AppText>
          </View>
      </TouchableOpacity>
    </View>
  )
}

export default StartScreen