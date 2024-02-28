import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../theme';

export type AgreeBoxProps = {
  agree: boolean[];
  setAgree: (value: boolean[]) => void;
}

const AgreeBox = ({agree, setAgree}: AgreeBoxProps) => {
  const handleAllAgree = () => {
    if (!agree[0]) { 
      setAgree([true, true, true]);
    } else {
      setAgree([false, false, false])
    }
  }

  useEffect(() => {
    if (agree[1] && agree[2]) {
      setAgree([true, true, true]);
    }

    if (agree[1]===false || agree[2]===false) {
      setAgree([false, agree[1], agree[2]]);
    }
  }, [agree[1], agree[2]])

  return (
    <View style={{width: '100%', marginTop: 19, display: 'flex', flexDirection: 'column'}}>
      <TouchableOpacity onPress={handleAllAgree} style={{width: '100%', borderRadius: 5, display: 'flex', flexDirection: 'row', padding: 12, alignItems: 'center', backgroundColor: theme.olive}}>
        <AntDesign name={agree[0]===true ? "checkcircle" : "checkcircleo"} size={18} color={theme.backgroundWhite} />
        <Text style={{marginLeft: 8, fontSize: 15, fontWeight: '700', color: theme.backgroundWhite }}>전체 동의</Text>
      </TouchableOpacity>
      <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 32}}>
        <TouchableOpacity style={{width: '100%', display: 'flex', flexDirection: 'row', padding: 12, alignItems: 'center'}} onPress={()=>setAgree([agree[0], !agree[1], agree[2]])}>
            <AntDesign name={agree[1]===true ? "checkcircle" : "checkcircleo"}  size={18} color={theme.cocoa} />
            <Text style={{marginLeft: 8, fontSize: 15}}>(필수) Acent 이용약관</Text>
        </TouchableOpacity>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.cocoa} />
      </View>
      <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 32}}>
        <TouchableOpacity style={{width: '100%', display: 'flex', flexDirection: 'row', padding: 12, alignItems: 'center'}} onPress={()=>setAgree([agree[0], agree[1], !agree[2]])}>
            <AntDesign name={agree[2]===true ? "checkcircle" : "checkcircleo"}  size={18} color={theme.cocoa} />
            <Text style={{marginLeft: 8, fontSize: 15}}>(필수) 개인정보 수집 및 이용동의</Text>
        </TouchableOpacity>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.cocoa} />
      </View>
    </View>
  )
}

export default AgreeBox