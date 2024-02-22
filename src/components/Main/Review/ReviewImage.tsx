import { View, Image, Text, Dimensions } from 'react-native'
import React from 'react'

type ReviewImageProps = {
    uri: string | undefined;
    resizeWidth: number;
    resizeHeight: number;
}

const ReviewImage = ({uri, resizeWidth, resizeHeight}: ReviewImageProps) => {

  return (
    <View style={{marginTop: 20, width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <Image source={{uri: uri}} style={{ width: resizeWidth, height:resizeHeight, borderRadius: 30}} />
    </View>
  )
}

export default ReviewImage