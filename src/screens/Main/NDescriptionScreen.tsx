import { View, Text } from 'react-native'
import React from 'react'
import theme from '../../../theme'
import Contents from '../../components/Main/Description/Contents'

const NDescriptionScreen = () => {
  return (
    <View style={{backgroundColor: theme.backgroundWhite}}>
      <Contents />
    </View>
  )
}

export default NDescriptionScreen