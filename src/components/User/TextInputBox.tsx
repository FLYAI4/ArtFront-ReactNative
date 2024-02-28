import { Text, TextInput, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import theme from '../../../theme';

export type TextInputBoxProps = {
    text: string;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
}

const TextInputBox = ({text, placeholder, value, setValue}: TextInputBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView style={{marginTop: 16}}>
      <Text style={{fontSize: 16, marginBottom: 8}}>{text}</Text>
      <TextInput 
        placeholder={placeholder || text} 
        style={{ color: theme.cocoa, borderWidth: 1, borderColor: isFocused  ? theme.cocoa : 'lightgray', borderRadius: 8, padding: 13}}
        value={value}
        onChangeText={setValue}
        onFocus={()=>setIsFocused(true)}
        onBlur={()=>setIsFocused(false)}
      />
    </KeyboardAvoidingView>
  )
}

export default TextInputBox