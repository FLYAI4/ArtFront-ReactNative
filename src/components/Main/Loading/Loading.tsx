import { View, Image } from 'react-native'
import React, {useEffect} from 'react'

type LoadingProps = {
    setIsLoading: (value: boolean) => void; 
}

const Loading = ({setIsLoading}: LoadingProps) => {
    const source1 = require('../../../assets/image/loading1.png')
    const source2 = require('../../../assets/image/loading2.png')
    const source3 = require('../../../assets/image/loading3.png')

    const sources = [source1, source2, source3]
    const randomSource = sources[Math.floor(Math.random() * sources.length)]

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);

  return (
    <View>
      <Image source={randomSource} resizeMode='cover' style={{ width:'100%', height: '100%'}}/>
    </View>
  )
}

export default Loading