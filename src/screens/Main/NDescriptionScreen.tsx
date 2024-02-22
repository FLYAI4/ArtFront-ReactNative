import { View, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import theme from '../../../theme'
import Contents from '../../components/Main/Description/Contents'
import GoBack from '../../components/Common/GoBack'
import NextPage from '../../components/Common/NextPage'

const NDescriptionScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundWhite}}>
      <GoBack />
      <NextPage nextPage='FocusPointingScreen'/>
      <Contents />
    </SafeAreaView>
  )
}

export default NDescriptionScreen