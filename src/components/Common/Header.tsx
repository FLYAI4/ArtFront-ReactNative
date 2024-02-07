import { View, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {ParamListBase, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

type HeaderProps = {
  nextPage: string;
}

const Header = ({nextPage}: HeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const logoSource = require('../../assets/image/logo.png')

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{ marginLeft: 20, marginRight:20, height: 50,  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialIcons name='keyboard-arrow-left' size={40} />
          </TouchableOpacity>
      
          <TouchableOpacity onPress={()=>navigation.push('MainScreen')}>
            <Image source={logoSource} style={{width: 40, height: 40}} /> 
            {/* TODO signup에선 메인스크린 이동안함 */}
          </TouchableOpacity>

        { nextPage !== 'DescriptionScreen' ? (
          <TouchableOpacity onPress={()=>navigation.push(nextPage)}>
            <MaterialIcons name='keyboard-arrow-right' size={40}/>
          </TouchableOpacity>
        ) : (
          <View>
            <MaterialIcons name='keyboard-arrow-right' size={40} color="white" />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Header