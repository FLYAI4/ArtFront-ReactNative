import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../../../theme';

export type SelectBoxProps = {
  options: string[];
  setValue: (value: string) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const SelectBox = ({options, setValue, selectedOption, setSelectedOption}: SelectBoxProps ) => {
  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    setValue(option);
  }


  return (
    <View style={{display: 'flex', flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <TouchableOpacity 
          style={{width: '49%', borderWidth:1,  borderColor: selectedOption === options[0] ? theme.cocoa : '#CECECE', borderRadius: 8, padding: 3}}
          onPress={() => handleOptionPress(options[0])}>
          <Text style={{padding:12, textAlign: 'center', fontSize: 16, color: '#666666'}}>{options[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{width: '49%', borderWidth:1,  borderColor: selectedOption === options[1] ? theme.cocoa : '#CECECE', borderRadius: 8, padding: 3}}
          onPress={() => handleOptionPress(options[1])}>
          <Text style={{padding:12, textAlign: 'center', fontSize: 16, color: '#666666'}}>{options[1]}</Text>
        </TouchableOpacity>
      </View>
  )
}

export default SelectBox