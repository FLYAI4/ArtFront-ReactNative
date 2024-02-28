import { View, Image } from 'react-native'
import React, {useEffect} from 'react'

type LoadingProps = {
    setIsLoading: (value: boolean) => void; 
}

const Loading = ({setIsLoading}: LoadingProps) => {
    const source = require('../../../assets/image/loading.png')

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
      <Image source={source} resizeMode='cover' style={{ width:'100%', height: '100%'}}/>
    </View>
  )
}

export default Loading