import { View, Text, TouchableOpacity, Platform, ToastAndroid, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import TextInputBox from '../../components/User/TextInputBox'
import PasswordInputBox from '../../components/User/PasswordInputBox'
import {ParamListBase, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

const Login = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const logoSource = require('../../assets/image/logo.png')


  const handleLogin = () => {
    // if (Platform.OS === 'android') {
    //   ToastAndroid.show(id, ToastAndroid.SHORT);
    // } else {
    //   Alert.alert(id);
    // }

    // navigation.push('MainScreen');
    navigation.push('Coordinates');
    setId('');
    setPassword('')
  }

  return (
    <>
    <View style={{width:'100%', height:'100%', backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
      <View style={{marginTop: 100, marginBottom: 50} }>
        <Image source={logoSource} style={{width: 100, height: 100}} />
      </View>
      <View style={{width: '100%', display: 'flex', flexDirection:'column', paddingLeft: 20, paddingRight: 20}}>
        <TextInputBox text="이메일" placeholder="artvisionxperience@gmail.com" value={id} setValue={setId} />
        <View style={{marginTop: 8}}></View>
        <PasswordInputBox text="비밀번호" placeholder='password' value={password} setValue={setPassword} />
        
        <TouchableOpacity style={{marginTop: 70,  borderRadius: 8, backgroundColor: '#333333', padding: 16}} onPress={handleLogin}>
          <Text style={{textAlign: 'center', width: '100%', fontSize: 18, color: '#FFFFFF'}}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{marginTop: 17, borderRadius: 8, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', padding: 16}} 
          onPress={()=> navigation.push('Signup')}
          >
          <Text style={{textAlign: 'center', width: '100%', fontSize: 18}}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

export default Login