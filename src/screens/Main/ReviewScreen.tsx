import { SafeAreaView } from 'react-native'
import React from 'react'
import GoBack from '../../components/Common/GoBack'
import theme from '../../../theme'
import Review from '../../components/Main/Review/Review'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'

const ReviewScreen = () => {
  return (
    <KeyboardAwareScrollView style={{backgroundColor: theme.backgroundWhite}}>
      <SafeAreaView>
        <GoBack cocoa/>
        <Review />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

export default ReviewScreen