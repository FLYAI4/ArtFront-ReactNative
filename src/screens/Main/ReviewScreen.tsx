import { View, SafeAreaView } from 'react-native'
import React from 'react'
import GoBack from '../../components/Common/GoBack'
import theme from '../../../theme'
import Review from '../../components/Main/Review/Review'

const ReviewScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundWhite}}>
      <GoBack cocoa/>
      <Review />
    </SafeAreaView>
  )
}

export default ReviewScreen