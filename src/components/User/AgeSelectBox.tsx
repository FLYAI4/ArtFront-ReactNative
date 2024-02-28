import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export type AgeSelectBoxProps = {
  options: string[];
  setValue: (value: string) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const AgeSelectBox = ({ options, setValue, selectedOption, setSelectedOption }: AgeSelectBoxProps) => {
  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    setValue(option);
  }

  const renderOptions = () => {
    const rows = [];
    for (let i = 0; i < options.length; i += 2) {
      const row = (
        <View key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <TouchableOpacity
            style={{
              width: '49%',
              borderWidth: 1,
              borderColor: selectedOption === options[i] ? 'black' : '#CECECE',
              borderRadius: 8,
              padding: 3
            }}
            onPress={() => handleOptionPress(options[i])}
          >
            <Text style={{ padding: 12, textAlign: 'center', fontSize: 16, color: '#666666' }}>{options[i]}</Text>
          </TouchableOpacity>
          {i + 1 < options.length && (
            <TouchableOpacity
              style={{
                width: '49%',
                borderWidth: 1,
                borderColor: selectedOption === options[i + 1] ? 'black' : '#CECECE',
                borderRadius: 8,
                padding: 3
              }}
              onPress={() => handleOptionPress(options[i + 1])}
            >
              <Text style={{ padding: 12, textAlign: 'center', fontSize: 16, color: '#666666' }}>{options[i + 1]}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
      rows.push(row);
    }
    return rows;
  }

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>연령대</Text>
      {renderOptions()}
    </View>
  )
}

export default AgeSelectBox
