import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SelectBox from './SelectBox'

export type GenderSelectBoxProps = {
  setValue: (value: string) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const GenderSelectBox = ({setValue, selectedOption, setSelectedOption}: GenderSelectBoxProps) => {
  return (
    <View style={{marginTop: 16}}>
      <Text style={{fontSize: 16, marginBottom: 8}}>성별</Text>
      <SelectBox options={['남성', '여성']} setValue={setValue} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
    </View>
  )
}

export default GenderSelectBox