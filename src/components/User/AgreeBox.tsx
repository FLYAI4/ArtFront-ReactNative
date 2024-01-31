import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const AgreeBox = () => {
  return (
    <View style={{width: '100%', marginTop: 19, display: 'flex', flexDirection: 'column'}}>
      <View style={{width: '100%', borderRadius: 5, display: 'flex', flexDirection: 'row', padding: 12, alignItems: 'center', backgroundColor: '#F8F8FA'}}>
        <AntDesign name="checkcircleo" size={18} color='#DDDDDD' />
        <Text style={{marginLeft: 8, fontSize: 15, fontWeight: '700'}}>전체 동의</Text>
      </View>
      <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 32}}>
        <View style={{width: '100%', display: 'flex', flexDirection: 'row', padding: 12, alignItems: 'center'}}>
            <AntDesign name="checkcircleo" size={18} color='#DDDDDD' />
            <Text style={{marginLeft: 8, fontSize: 15}}>(필수) ArtVisionXperience 이용약관</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color='#333333' />
      </View>
      <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 32}}>
        <View style={{width: '100%', display: 'flex', flexDirection: 'row', padding: 12, alignItems: 'center'}}>
            <AntDesign name="checkcircleo" size={18} color='#DDDDDD' />
            <Text style={{marginLeft: 8, fontSize: 15}}>(필수) 개인정보 수집 및 이용동의</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color='#333333' />
      </View>
    </View>
  )
}

export default AgreeBox