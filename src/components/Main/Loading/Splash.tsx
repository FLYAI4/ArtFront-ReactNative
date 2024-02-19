import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import Video from 'react-native-video';

type SplashProps = {
    setSplash: (value: boolean) => void;
}

const Splash = ({setSplash}: SplashProps) => {
    const splashScreen = require('../../../assets/video/splash.mp4');

    useEffect(()=>{
        const timer = setTimeout(()=>{
          setSplash(false);
        }, 4000);

    return ()=>clearTimeout(timer);
    }, []);

  return (
    <Video 
      source={splashScreen} 
      resizeMode={'cover'} 
      style={{ position: 'absolute', width: '100%', height: '100%', top: 0, bottom: 0, left: 0, right: 0}} />
  )
}

export default Splash





