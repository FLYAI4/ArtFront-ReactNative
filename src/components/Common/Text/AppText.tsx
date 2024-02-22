import {Text } from 'react-native'
import React from 'react'

const AppText = (props: any) => {
  return (
    <Text 
        {...props} 
        style={{...props.style, fontFamily: 'NanumMyeongjo'}}>{props.children}</Text>
  )
}
export default AppText