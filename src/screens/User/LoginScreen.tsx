import { View, Text, TouchableOpacity, Platform, ToastAndroid, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import TextInputBox from '../../components/User/TextInputBox'
import PasswordInputBox from '../../components/User/PasswordInputBox'
import {ParamListBase, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import theme from '../../../theme';
import { useMutation } from 'react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const logoSource = require('../../assets/image/acent.png')
  
  const loginMutation = useMutation(async () => {
    const data = {
      id: id,
      password: password,
    };

    const response = await axios.post(`${process.env.BASE_URL}/account/login`, data);
    return response.data;
  })

  const handleLogin = async () => {
    const response = await loginMutation.mutateAsync();
    if (response.meta.code === 200) {
      AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            id: response.data.id,
            token: response.data.token
        })
      )
      navigation.push('HomeScreen');
    }
  }

  return (
    <View style={{ width:'100%', height:'100%', backgroundColor: theme.backgroundWhite, display: 'flex', alignItems: 'center' }}>
      <View style={{marginTop: 100, marginBottom: 50} }>
        <Image source={logoSource} style={{width: 250, height: 200}} resizeMode='contain'/>
      </View>
      <View style={{width: '100%', display: 'flex', flexDirection:'column', paddingLeft: 20, paddingRight: 20}}>
        <TextInputBox text="이메일" placeholder="acent@gmail.com" value={id} setValue={setId} />
        <View style={{marginTop: 8}}></View>
        <PasswordInputBox text="비밀번호" placeholder='password' value={password} setValue={setPassword} />
        
        <TouchableOpacity style={{marginTop: 70,  borderRadius: 8, backgroundColor: theme.olive, padding: 16,}} onPress={handleLogin}>
          <Text style={{textAlign: 'center', width: '100%', fontSize: 18, color: theme.backgroundWhite, fontWeight: '600'}}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{marginTop: 17, borderRadius: 8, backgroundColor: theme.backgroundWhite, borderWidth:2, borderColor: theme.olive, padding: 16}} 
          onPress={()=> navigation.push('SignupScreen')}
          >
          <Text style={{textAlign: 'center', width: '100%', fontSize: 18, color: theme.olive, fontWeight: '600'}}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen