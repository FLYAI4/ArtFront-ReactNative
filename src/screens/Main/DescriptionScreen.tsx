import { SafeAreaView } from 'react-native'
import React from 'react'
import theme from '../../../theme'
import Contents from '../../components/Main/Description/Contents'
import GoBack from '../../components/Common/GoBack'
import NextPage from '../../components/Common/NextPage'

const DescriptionScreen = () => {  
  
  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundWhite}}>
      <GoBack />
      <Contents />
      <NextPage nextPage='FocusPointingScreen' />
    </SafeAreaView>
  )
}

export default DescriptionScreen