import { View, Text, TouchableOpacity, Platform, ToastAndroid, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import TextInputBox from '../../components/User/TextInputBox'
import PasswordInputBox from '../../components/User/PasswordInputBox'
import {ParamListBase, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import Splash from '../../components/Main/Loading/Splash';
import AppText from '../../components/Common/Text/AppText';

const Login = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  
  const [splash, setSplash] = useState(true);

  const logoSource = require('../../assets/image/logo-full-dark.png')

  const handleLogin = () => {
    // if (Platform.OS === 'android') {
    //   ToastAndroid.show(id, ToastAndroid.SHORT);
    // } else {
    //   Alert.alert(id);
    // }

    navigation.push('MainScreen');
    setId('');
    setPassword('')
  }

  if (splash) {
    return (
      <Splash setSplash={setSplash} />
    )
  }

  return (
    <View style={{ width:'100%', height:'100%', backgroundColor: 'black', display: 'flex', alignItems: 'center' }}>
      <View style={{marginTop: 100, marginBottom: 50} }>
        <Image source={logoSource} style={{width: 250, height: 200}} resizeMode='contain'/>
      </View>
      <View style={{width: '100%', display: 'flex', flexDirection:'column', paddingLeft: 20, paddingRight: 20}}>
        <TextInputBox text="이메일" placeholder="artvisionxperience@gmail.com" value={id} setValue={setId} />
        <View style={{marginTop: 8}}></View>
        <PasswordInputBox text="비밀번호" placeholder='password' value={password} setValue={setPassword} />
        
        <TouchableOpacity style={{marginTop: 70,  borderRadius: 8, backgroundColor: 'black', padding: 16, borderWidth: 1, borderColor: '#CECECE'}} onPress={handleLogin}>
          <AppText style={{textAlign: 'center', width: '100%', fontSize: 18, color: '#CECECE'}}>로그인</AppText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{marginTop: 17, borderRadius: 8, borderWidth: 1, borderColor: 'white', backgroundColor: 'white', padding: 16}} 
          onPress={()=> navigation.push('Signup')}
          >
          <Text style={{textAlign: 'center', width: '100%', fontSize: 18}}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login