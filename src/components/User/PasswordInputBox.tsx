import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../../../theme';

export type PasswordInputBoxProps = {
  text: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

const PasswordInputBox = ({text, placeholder, value, setValue}: PasswordInputBoxProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={{marginTop: 16}}>
      <Text style={{fontSize: 16, marginBottom: 8}}>{text}</Text>
      <View>
        <TextInput 
          secureTextEntry={!showPassword} placeholder={placeholder || text} 
          style={{ color: theme.cocoa, borderWidth: 1, borderColor: isFocused ? theme.cocoa : 'lightgray' , borderRadius: 8, padding: 13}}
          value={value}
          onChangeText={setValue}
          onFocus={()=>setIsFocused(true)}
          onBlur={()=>setIsFocused(false)}
          blurOnSubmit={false}
          onSubmitEditing={()=> Keyboard.dismiss()}
          />
        <TouchableOpacity style={{ position: 'absolute', right: 12, top: 8}} onPress={togglePasswordVisibility}>
          { !showPassword ? (
            <Entypo name="eye" size={25} color='#666666' />
          ) : (
            <Entypo name="eye-with-line" size={25} color='#666666' />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PasswordInputBox