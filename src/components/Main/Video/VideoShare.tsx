import { View, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import theme from '../../../../theme'
import AppText from '../../Common/Text/AppText'

const VideoShare = () => {
  return (
    <View style={{ width: '80%', marginTop: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={{backgroundColor: theme.backgroundWhite, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
          <AntDesign name="download" size={25} color={theme.olive} />
        </TouchableOpacity>
        <AppText style={{fontSize: 16, marginTop: 10, fontWeight: 400}}>download</AppText>
      </View>

      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={{backgroundColor: theme.backgroundWhite, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
          <AntDesign name="message1" size={25} color={theme.olive} />
        </TouchableOpacity>
        <AppText style={{fontSize: 16, marginTop: 10, fontWeight: 400}}>message</AppText>
      </View>

      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={{backgroundColor: theme.backgroundWhite, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
          <AntDesign name="instagram" size={25} color={theme.olive} />
        </TouchableOpacity>
        <AppText style={{fontSize: 16, marginTop: 10, fontWeight: 400}}>instagram</AppText>
      </View>

    </View>
  )
}

export default VideoShare