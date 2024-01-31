import { View, Text } from 'react-native'
import React from 'react'
import PlayVideo from '../../components/Main/PlayVideo'
import UploadImage from '../../components/Main/UploadImage'
import Header from '../../components/Common/Header'

const MainScreen = () => {
  return (
    <>
    <Header />
    <View style={{width: '100%', display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginTop: 150}}>
      <UploadImage />
      <View style={{marginTop: 50}}></View>
      <PlayVideo />
    </View>
    </>
  )
}

export default MainScreen