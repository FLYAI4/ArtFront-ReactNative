import { View } from 'react-native'
import React from 'react'
import Header from '../../components/Common/Header'
import Coordinates from '../../components/Main/FocusPointing/Coordinates'

const FocusPointingScreen = () => {
  return (
    <View>
        <Header nextPage="Image2VideoScreen" /> 
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
          <Coordinates />
        </View>
    </View>
  )
}

export default FocusPointingScreen