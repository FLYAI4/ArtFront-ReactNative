import { View, Text } from 'react-native'
import React, { useEffect} from 'react'
import GifImage from '@lowkeychat/react-native-gif';
import Header from '../../Common/Header';

type OpenCVtypes = {
    setIsLoading: (value: boolean) => void
}

const OpenCV = ({setIsLoading}: OpenCVtypes) => {
    const loadingGif = 'file:///Users/heehminh/src/ArtFront-ReactNative/src/assets/gif/landscape0.gif';
  
    // TODO 서버연결 로딩 컴포넌트
    // const filePath = storeGifRNFS({ response })
    // const loadingGif = `file://${filePath}`;
  
    useEffect(()=>{
      const timer = setTimeout(()=>{
        setIsLoading(false);
      }, 50000);
  
      return () => clearTimeout(timer);
    }, []);


  return (
    <View style={{backgroundColor:'white'}}>
        <Header nextPage='MainScreen' />
        <View style={{"backgroundColor": 'white', width: "100%", height: "100%", display: 'flex', marginTop:150,  alignItems: 'center'}}>
          <GifImage source={{uri: loadingGif}} style={{zIndex:1, width: 400, height: 400 }} resizeMode={'contain'} />
          <Text style={{marginTop: 30}}>그림의 생명을 불어넣는중..</Text>
        </View>
        </View>
  )
}

export default OpenCV