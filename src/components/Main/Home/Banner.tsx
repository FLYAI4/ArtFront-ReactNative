import { View, Image, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import { Dimensions } from 'react-native'
import theme from '../../../../theme';

const Banner = () => {
  const screenWidth = Dimensions.get('screen').width;

  const banner1 = require('../../../assets/image/Banner/banner1.png')
  const banner2 = require('../../../assets/image/Banner/banner2.png')
  const banner3 = require('../../../assets/image/Banner/banner3.png')
  const banner4 = require('../../../assets/image/Banner/banner4.png')

  const resizeMode = 'cover'
  const handleImagePress = (url: string) => {
    Linking.openURL(url)
  }


  return (
    <Swiper loop autoplay autoplayTimeout={3} dotColor={theme.backgroundWhite} activeDotColor={theme.olive} >
        <TouchableOpacity onPress={()=>handleImagePress('https://www.sktelecom.com/')}>
          <View>
            <Image source={banner1} style={{width: screenWidth, height: '100%'}} resizeMode={resizeMode} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>handleImagePress('https://www.skttechacademy.com/')}>
          <View>
            <Image source={banner1} style={{width: screenWidth, height: '100%'}} resizeMode={resizeMode} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>handleImagePress('https://www.skttechacademy.com/')}>
          <View>
            <Image source={banner3} style={{width: screenWidth, height: '100%'}} resizeMode={resizeMode} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>handleImagePress('https://www.skttechacademy.com/')}>
          <View>
            <Image source={banner4} style={{width: screenWidth, height: '100%'}} resizeMode={resizeMode} />
          </View>
        </TouchableOpacity>
    </Swiper>
  )
}

export default Banner