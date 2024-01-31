import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SelectBox from './SelectBox'

const GenderSelectBox = () => {
  return (
    <View style={{marginTop: 16}}>
      <Text style={{fontSize: 16, marginBottom: 8}}>성별</Text>
      <SelectBox options={['남성', '여성']} />
    </View>
  )
}

export default GenderSelectBox