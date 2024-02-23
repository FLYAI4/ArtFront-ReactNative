import { View, Text, Dimensions, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState} from 'react'
// import Header from '../../Common/Header';
import FastImage, { Source } from 'react-native-fast-image'

type OpenCVtypes = {
    setIsLoading: (value: boolean) => void
}

const OpenCV = ({setIsLoading}: OpenCVtypes) => {
    const [loadingGif, setLoadingGif] = useState<Source>(require('../../../assets/gif/landscape0.gif'));

    useEffect(()=>{
        const interval = setInterval(()=> {
            setLoadingGif(require("../../../assets/image/loading-whitebox.png"))
            setLoadingGif(require('../../../assets/gif/landscape0.gif'))
        }, 20000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    useEffect(()=>{
      const timer = setTimeout(()=>{
        setIsLoading(false);
      }, 30000);
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <View style={{backgroundColor:'white', display: 'flex',  width: '100%', height: '100%'}}>
        {/* <Header nextPage='HomeScreen' /> */}
        <View style={{paddingBottom: 75, backgroundColor: 'white', width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <FastImage source={ loadingGif as Source } style={{zIndex:1, width: 400, height: 400 }} resizeMode={FastImage.resizeMode.contain}/>
          <Text style={{marginTop: 30}}>그림에 생명을 불어넣는 중..</Text>
        </View>
    </View>
  )
}

export default OpenCV