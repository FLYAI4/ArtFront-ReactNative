import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from '../../components/Common/Text/AppText'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

const Start = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View>
      <Text>Start</Text>
      <TouchableOpacity onPress={()=>navigation.push('LoginScreen')} style={{marginTop:300}}>
        <AppText>갤러리 방문하기</AppText>
      </TouchableOpacity>
    </View>
  )
}

export default Start