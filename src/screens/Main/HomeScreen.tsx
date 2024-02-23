import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AppText from '../../components/Common/Text/AppText'
import { getStatusBarHeight } from 'rn-statusbar-height'
import theme from '../../../theme'
import Banner from '../../components/Main/Home/Banner'


const HomeScreen = () => {
    const logo = require('../../assets/image/acent.png');
    const top = getStatusBarHeight() + 20;

    const image1 = require('../../assets/image/Popular/5.jpg');
    const image2 = require('../../assets/image/Popular/6.jpg');
    const image3 = require('../../assets/image/Popular/9.jpg');
    const image4 = require('../../assets/image/Popular/16.jpg');
    const image5 = require('../../assets/image/Popular/18.jpg');

  return (
    <View style={{width: '100%', height: '100%', position: 'relative'}}>
      <ScrollView style={{backgroundColor: theme.backgroundWhite}}>
        <View style={{marginTop: top, marginLeft: 20, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Image source={logo} style={{width: 80, height: 80, marginRight: 20}} />
          <View>
              <AppText style={{fontWeight: '700', fontSize: 22}}>AI Docent</AppText>
              <AppText style={{fontSize: 14}}>Discovering Your Artistic Interests!</AppText>
          </View>
        </View>

        <View>
          <AppText style={{margin: 20, fontSize: 16}}>최근 가장 인기 많은 작품 컬렉션</AppText>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', marginLeft: 20}}>
                  <Image source={image4} style={{width: 160, height: 200, borderRadius: 20, marginRight: 20}} />
                  <Image source={image1} style={{width: 160, height: 200, borderRadius: 20, marginRight: 20}} />
                  <Image source={image2} style={{width: 160, height: 200, borderRadius: 20, marginRight: 20}} />
                  <Image source={image3} style={{width: 160, height: 200, borderRadius: 20, marginRight: 20}} />
                  <Image source={image5} style={{width: 160, height: 200, borderRadius: 20}} />
              </View>
          </ScrollView>
        </View>

        <View style={{width: '100%', height:290 }}>
          <AppText style={{margin: 20, fontSize: 16}}>현재 전시 중인 갤러리</AppText>
          <Banner />
        </View>
      </ScrollView>

      <View style={{ width: '100%', position: 'absolute', bottom: 43, left: 0, right: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity>
          <View style={{ borderRadius: 55, overflow: 'hidden', borderWidth: 2, borderColor: theme.olive, }}>
            <AppText style={{ width: 350, padding: 20,  backgroundColor: theme.olive, color: theme.backgroundWhite, fontWeight: '600', fontSize: 24, textAlign: 'center', }}>작품 감상하러 가기</AppText>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default HomeScreen