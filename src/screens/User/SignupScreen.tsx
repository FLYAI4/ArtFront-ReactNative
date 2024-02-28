import { View, Text, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import TextInputBox from '../../components/User/TextInputBox';
import PasswordInputBox from '../../components/User/PasswordInputBox';
import GenderSelectBox from '../../components/User/GenderSelectBox';
import AgeSelectBox from '../../components/User/AgeSelectBox';
import AgreeBox from '../../components/User/AgreeBox';
import { getStatusBarHeight } from 'rn-statusbar-height';
import theme from '../../../theme';
import { useMutation } from 'react-query';
import axios from 'axios';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const [selectedAgeOption, setSelectedAgeOption] = useState("");
  const [selectedGenderOption, setSelectedGenderOption] = useState("");

  const [agree, setAgree] = useState([false, false, false]);
  const [buttonOpacity, setButtonOpacity] = useState(0.2);

  const top = getStatusBarHeight()+20;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (name && id && password && passwordCheck && gender && age && agree[0]) {
      setButtonOpacity(1.0);
    } else {
      setButtonOpacity(0.2);
    }
  }, [name, id, password, passwordCheck, gender, age, agree[0]]);

  const signupMutation = useMutation(async () => {
    try {
      const data = {
        id: id,
        password: password,
        name: name,
        gender: gender,
        age: age
      };

      const response = await axios.post(`${process.env.BASE_URL}/account/signup`, data);

      if (response.status === 401) {
        Alert.alert('이미 가입하신 이메일입니다.');
      } else if (response.status !== 200) {
        Alert.alert('회원가입에 실패하셨습니다.');
      }

      return { data: response.data, status: response.status };
    } catch (error) {
      console.error(error);
      Alert.alert(`${error}, API 호출 중에 오류가 발생했습니다.`);
      throw error;
    }
  })

  const handleSubmit = async () => {
    if (!id.includes('@') || !/^[a-zA-Z0-9@.]+$/.test(id)) {
      Alert.alert('이메일 형식이 올바르지 않습니다. 이메일 주소를 다시 확인해주세요.');
      return;
    }

    if (password.length < 6 || password.length > 12) {
      Alert.alert('비밀번호는 6글자 이상, 12글자 이하여야 합니다.');
      return;
    }

    if (password !== passwordCheck) {
      Alert.alert('비밀번호와 비밀번호 확인이 동일하지 않습니다. 다시 확인해주세요.');
      return;
    }
    
    if (agree[0] !== true) {
      Alert.alert('이용약관과 개인정보 수집에 동의해야 회원가입이 진행됩니다.');
      return;
    }

    const response = await signupMutation.mutateAsync();
    
    if (response.status === 200) {
      Alert.alert(`${name}님 회원가입이 성공적으로 완료되었습니다!`);
      navigation.push('LoginScreen');
    }

    setName("");
    setId("");
    setPassword("");
    setPasswordCheck("");
    setGender("");
    setAge("");
    setSelectedAgeOption("");
    setSelectedGenderOption("");
    setAgree([false, false, false]);
  };

  return (
    <View style={{backgroundColor: theme.backgroundWhite}}>
    <View style={{ width: '100%', height: 'auto', marginTop: top}}>
      <ScrollView>
        <View style={{display: 'flex', flexDirection: 'column',marginTop:20,  marginLeft: 20, marginRight: 20}}>
          <View style={{marginBottom: 13}}>
            <Text style={{fontSize: 22, fontWeight: '700'}}>회원 정보를 입력해 주세요!</Text>
            <Text style={{fontSize: 14 }}>수집된 개인정보는 <Text style={{fontWeight: '600'}}>서비스 운영의 목적으로만</Text> 사용됩니다.</Text>
          </View>

          <TextInputBox text="닉네임" value={name} setValue={setName} />
          <TextInputBox text="이메일" placeholder="acent@gmail.com" value={id} setValue={setId} />
          <PasswordInputBox text="비밀번호" placeholder='6-12 자의 비밀번호 입력' value={password} setValue={setPassword} />
          <PasswordInputBox text="비밀번호" placeholder='6-12 자의 비밀번호 입력' value={passwordCheck} setValue={setPasswordCheck} />
          <GenderSelectBox setValue={setAge} selectedOption={selectedGenderOption} setSelectedOption={setSelectedGenderOption} />
          <AgeSelectBox options={['10대 이하', '20대', '30대', '40대', '50대', '60대 이하']} setValue={setGender} selectedOption={selectedAgeOption} setSelectedOption={setSelectedAgeOption}/>

          <AgreeBox agree={agree} setAgree={setAgree} />

          <TouchableOpacity style={{marginTop: 24, marginBottom: 27, borderRadius: 8, backgroundColor: theme.cocoa, padding: 16, opacity: buttonOpacity, pointerEvents: buttonOpacity === 0.2 ? 'none' : 'auto',}} onPress={handleSubmit}>
            <Text style={{textAlign: 'center', width: '100%', fontSize: 18, color: '#FFFFFF'}}>회원가입</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
      </View>
    </View>
    
  )
}

export default SignupScreen