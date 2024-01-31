import { View, TextInput, Button, Text, Platform, Alert, ToastAndroid, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import Header from '../../components/Common/Header';
import TextInputBox from '../../components/User/TextInputBox';
import PasswordInputBox from '../../components/User/PasswordInputBox';
import GenderSelectBox from '../../components/User/GenderSelectBox';
import AgeSelectBox from '../../components/User/AgeSelectBox';
import AgreeBox from '../../components/User/AgreeBox';

const Signup = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  // TODO 서버에 전송하는 함수로 
  const handleSubmit = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(id, ToastAndroid.SHORT);
    } else {
      Alert.alert(id);
    }
  }

  return (
    <>
    <View style={{backgroundColor: '#ffffff', width: '100%', height: '100%'}}>
      <Header />
      <ScrollView>
        <View style={{display: 'flex', flexDirection: 'column', marginLeft: 20, marginRight: 20}}>
          <View style={{marginBottom: 13}}>
            <Text style={{fontSize: 22, fontWeight: '700'}}>회원 정보를 입력해 주세요!</Text>
            <Text style={{fontSize: 14 }}>수집된 개인정보는 <Text style={{fontWeight: '600'}}>서비스 운영의 목적으로만</Text> 사용됩니다.</Text>
          </View>

          <TextInputBox text="닉네임" value={name} setValue={setName} />
          <TextInputBox text="이메일" placeholder="artvisionxperience@gmail.com" value={id} setValue={setId} />
          <PasswordInputBox text="비밀번호" placeholder='password' value={password} setValue={setPassword} />
          <PasswordInputBox text="비밀번호" placeholder='password' value={passwordCheck} setValue={setPasswordCheck} />
          <GenderSelectBox />
          <AgeSelectBox />

          <AgreeBox />

          <TouchableOpacity style={{marginTop: 24, marginBottom: 27, borderRadius: 8, backgroundColor: '#333333', padding: 16, opacity: 0.2}}>
            <Text style={{textAlign: 'center', width: '100%', fontSize: 18, color: '#FFFFFF'}} onPress={handleSubmit}>회원가입</Text>
          </TouchableOpacity>
          
          
        </View>
      </ScrollView>
      </View>
    </>
    
  )
}

export default Signup