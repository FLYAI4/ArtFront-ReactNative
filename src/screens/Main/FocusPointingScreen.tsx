import { SafeAreaView } from 'react-native'
import React from 'react'
import Coordinates from '../../components/Main/FocusPointing/Coordinates'
import GoBack from '../../components/Common/GoBack'
import NextPage from '../../components/Common/NextPage'
import theme from '../../../theme'

const FocusPointingScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundWhite}}>
      <GoBack />
      <Coordinates />
      <NextPage nextPage='Image2VideoScreen' />
    </SafeAreaView>
  )
}

export default FocusPointingScreen