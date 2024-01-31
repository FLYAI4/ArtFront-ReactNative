import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SelectBox from './SelectBox'

const AgeSelectBox = () => {
  return (
    <View style={{marginTop: 16}}>
        <Text style={{fontSize: 16, marginBottom: 8}}>연령대</Text>
        <SelectBox options={['10대 이하', '20대']}/>
        <View style={{marginBottom: 8}}></View>
        <SelectBox options={['30대', '40대']}/>
        <View style={{marginBottom: 8}}></View>
        <SelectBox options={['50대', '60대 이상']}/>
    </View>
  )
}

export default AgeSelectBox