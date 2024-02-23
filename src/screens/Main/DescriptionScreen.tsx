import { Image, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import theme from '../../../theme'
import Contents from '../../components/Main/Description/Contents'
import GoBack from '../../components/Common/GoBack'
import NextPage from '../../components/Common/NextPage'
import OpenCV from '../../components/Main/Loading/OpenCV'

const imagePath = [
  require('../../assets/image/LoadingImage/Group3076.png'),
  require('../../assets/image/LoadingImage/Group3078.png'),
  require('../../assets/image/LoadingImage/Group3079.png'),
  require('../../assets/image/LoadingImage/Group3081.png'),
  require('../../assets/image/LoadingImage/Group3082.png'),
]

const DescriptionScreen = () => {
  const [firstLoading, setFirstLoading] = useState(true)
  const [secondLoading, setSecondLoading] = useState(true)
  const [imageNumber, setImageNumber] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomGroup = Math.floor(Math.random() * 5); 
      randomGroup !== imageNumber ? setImageNumber(randomGroup) : setImageNumber(1)
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [firstLoading, imageNumber])

  useEffect(()=> {
    const timer = setTimeout(()=>{
      setFirstLoading(false)
      setSecondLoading(true)
    }, 10000);

    return ()=>clearTimeout(timer);
  }, []);

  if (firstLoading) {
    return <Image source={imagePath[imageNumber]} style={{ width: '100%', height: '100%'}} />
  }

  if (secondLoading) {
    return <OpenCV setIsLoading={setSecondLoading} />
  }

  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundWhite}}>
      <GoBack />
      <Contents />
      <NextPage nextPage='FocusPointingScreen' />
    </SafeAreaView>
  )
}

export default DescriptionScreen