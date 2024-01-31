import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export type SelectBoxProps = {
    options: string[];
}

const SelectBox = ({options}: SelectBoxProps ) => {
  return (
    <View style={{display: 'flex', flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <TouchableOpacity style={{width: '49%', borderWidth:1, borderColor: '#CECECE', borderRadius: 8, padding: 3}}>
          <Text style={{padding:12, textAlign: 'center', fontSize: 16, color: '#666666'}}>{options[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '49%', borderWidth:1, borderColor: '#CECECE', borderRadius: 8, padding: 3}}>
          <Text style={{padding:12, textAlign: 'center', fontSize: 16, color: '#666666'}}>{options[1]}</Text>
        </TouchableOpacity>
      </View>
  )
}

export default SelectBox