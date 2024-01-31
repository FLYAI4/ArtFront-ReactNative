import { View, Text, TextInput } from 'react-native'
import React from 'react'

export type TextInputBoxProps = {
    text: string;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
}

const TextInputBox = ({text, placeholder, value, setValue}: TextInputBoxProps) => {
  return (
    <View style={{marginTop: 16}}>
      <Text style={{fontSize: 16, marginBottom: 8}}>{text}</Text>
      <TextInput 
        placeholder={placeholder || text} 
        style={{ borderWidth: 1, borderColor: '#CECECE', borderRadius: 8, padding: 13}}
        value={value}
        onChangeText={setValue}
      />
    </View>
  )
}

export default TextInputBox