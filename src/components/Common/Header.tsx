import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {ParamListBase, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

const Header = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView>
      <View style={{ width: '100%', height: 50,  display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{ position: 'absolute', left: 0 }} onPress={()=>navigation.goBack()}>
            <MaterialIcons name='keyboard-arrow-left' size={40} />
          </TouchableOpacity>
      
          <TouchableOpacity>
            <Entypo name='air' size={30} /> 
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Header