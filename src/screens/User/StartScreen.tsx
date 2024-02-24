import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from '../../components/Common/Text/AppText'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Start = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const handleNavigation = async () => {
      const userInfo = await AsyncStorage.getItem('userData');

      if (userInfo) {
        navigation.push('HomeScreen')
      } else {
        navigation.push('LoginScreen')
      }
    }

  return (
    <View>
      <Text>Start</Text>
      <TouchableOpacity onPress={handleNavigation} style={{marginTop:300}}>
        <AppText>갤러리 방문하기</AppText>
      </TouchableOpacity>
    </View>
  )
}

export default Start