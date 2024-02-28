import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AppText from '../../Common/Text/AppText'
import theme from '../../../../theme'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

type ReviewButtonProps = {
    like: boolean;
    setLike: (value: boolean) => void;
}

const ReviewButton = ({like, setLike}: ReviewButtonProps) => {
    const handleClick = () => {
        setLike(!like)
    }

  return (
    <View style={{marginTop: 20, marginLeft: 20, marginRight: 20, display: 'flex', flexDirection: 'column'}}>
      <AppText style={{ fontSize: 18, color: theme.cocoa,fontWeight:600, marginBottom: 20 }}>작품에 대한 소중한 평가 부탁드립니다.</AppText>
      <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
        <TouchableOpacity 
            style={{ width: '48%', height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth:4, 
            borderColor: theme.olive, backgroundColor: like ? theme.olive : theme.backgroundWhite }}
            onPress={handleClick}>
            <FontAwesome5 name="thumbs-up" size={40} color={like ? theme.backgroundWhite : theme.olive} />
        </TouchableOpacity>
        <TouchableOpacity 
            style={{ width: '48%', height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth:4, 
            borderColor: theme.olive, backgroundColor: !like ? theme.olive : theme.backgroundWhite }}
            onPress={handleClick}>
            <FontAwesome5 name="thumbs-down" size={40} color={!like ? theme.backgroundWhite : theme.olive} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReviewButton