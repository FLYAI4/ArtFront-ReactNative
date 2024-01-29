import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';

const PlayVideo = () => {
    const [opPress, setOnPress] = useState(false);
    const video = require('../../assets/video/output.mp4');

  return (
    <View style={{
        width: '100%',
        height:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        { opPress ? (
            <Video 
            source={video}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }}
            fullscreen={true}
            resizeMode={'contain'}
            repeat={true}
            controls={true}
            paused={false}
            onEnd={()=>setOnPress(false)}
            />
        ) : (
            <TouchableOpacity onPress={()=>setOnPress(true)}>
                <Entypo name="video" color="black" size={60} />
            </TouchableOpacity>
        )}
      
    </View>
  )
}

export default PlayVideo