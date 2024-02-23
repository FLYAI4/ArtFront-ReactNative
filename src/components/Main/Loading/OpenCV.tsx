import { View, Text, Dimensions, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState} from 'react'
// import Header from '../../Common/Header';
import FastImage, { Source } from 'react-native-fast-image'
import { width, height } from '../../../constants/imageInfo'
import AppText from '../../Common/Text/AppText'
import theme from '../../../../theme'

type OpenCVtypes = {
    setIsLoading: (value: boolean) => void
}

const OpenCV = ({setIsLoading}: OpenCVtypes) => {
    const [loadingGif, setLoadingGif] = useState<Source>(require('../../../assets/gif/opencv1.gif'));

    useEffect(()=>{
      const timer = setTimeout(()=>{
        setIsLoading(false);
      }, 30000);
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <View style={{ display: 'flex',  flexDirection:'column', width: '100%', height: '100%'}}>
        <View style={{ backgroundColor: theme.olive, width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
          <FastImage source={ loadingGif as Source } style={{zIndex:1, width: width, height: height }} resizeMode={FastImage.resizeMode.contain} />
        </View>
        <AppText style={{ position:'absolute', fontWeight:'600', left: 0, right: 0, bottom:30, width:'100%', textAlign: 'center', fontSize: 20, color: theme.backgroundWhite}}>그림에 생명을 불어넣는 중..</AppText>
    </View>
  )
}

export default OpenCV