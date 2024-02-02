import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {ParamListBase, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

const Header = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const logoSource = require('../../assets/image/logo.png')

  return (
    <SafeAreaView>
      <View style={{ width: '100%', height: 50,  display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{ position: 'absolute', left: 0 }} onPress={()=>navigation.goBack()}>
            <MaterialIcons name='keyboard-arrow-left' size={40} />
          </TouchableOpacity>
      
          <TouchableOpacity onPress={()=>navigation.push('MainScreen')}>
            <Image source={logoSource} style={{width: 40, height: 40}} /> 
            {/* TODO signup에선 메인스크린 이동안함 */}
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Header