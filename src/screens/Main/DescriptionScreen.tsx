import { View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Common/Header'
import Description from '../../components/Main/Description/Description'

const imagePath = [
  require('../../assets/image/LoadingImage/Group3058.png'),
  require('../../assets/image/LoadingImage/Group3059.png'),
  require('../../assets/image/LoadingImage/Group3060.png'),
  require('../../assets/image/LoadingImage/Group3061.png'),
  require('../../assets/image/LoadingImage/Group3062.png'),
  require('../../assets/image/LoadingImage/Group3063.png'),
  require('../../assets/image/LoadingImage/Group3064.png'),
  require('../../assets/image/LoadingImage/Group3065.png'),
  require('../../assets/image/LoadingImage/Group3066.png'),
  require('../../assets/image/LoadingImage/Group3067.png'),
]

const DescriptionScreen = () => {
  const [firstLoading, setFirstLoading] = useState(true)
  const [secondLoading, setSecondLoading] = useState(true)
  const [imageNumber, setImageNumber] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomGroup = Math.floor(Math.random() * 10); 
      randomGroup !== imageNumber ? setImageNumber(randomGroup) : setImageNumber(10)
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [firstLoading, imageNumber])

  useEffect(()=> {
    const timer = setTimeout(()=>{
      setFirstLoading(false)
    }, 10000);

    return ()=>clearTimeout(timer);
  }, []);

  if (firstLoading) {
    return <Image source={imagePath[imageNumber]} style={{ width: '100%', height: '100%'}} />
  }

  return (
    <View style={{backgroundColor: 'white'}}>
        <Header nextPage='FocusPointingScreen'/>
        <Description /> 
    </View>
  )
}

export default DescriptionScreen