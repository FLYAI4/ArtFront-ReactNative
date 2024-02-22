import { View, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {ParamListBase, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import SoundPlayer from 'react-native-sound-player';

type HeaderProps = {
  nextPage: string;
}

const Header = ({nextPage}: HeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const logoSource = require('../../assets/image/logo-dark.png')

  if (nextPage === 'Image2VideoScreen') {
    SoundPlayer.stop();
  }

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View style={{ marginLeft: 20, marginRight:20, height: 60,  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialIcons name='keyboard-arrow-left' size={40} color='white' />
          </TouchableOpacity>
        { nextPage !== 'NDescriptionScreen' ? (
          <TouchableOpacity onPress={()=>navigation.push(nextPage)}>
            <MaterialIcons name='keyboard-arrow-right' size={40} color='white' />
          </TouchableOpacity>
        ) : (
          <View>
            <MaterialIcons name='keyboard-arrow-right' size={40} color="black" />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Header