import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import UploadImage from '../../components/Main/UploadImage'
import Header from '../../components/Common/Header'
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';

const MainScreen = () => {
    const [onPress, setOnPress] = useState(false);
    const video = require('../../assets/video/output.mp4');

    return (
        <View style={{position: 'relative', width: '100%', height: '100%'}}>
            { onPress ? (
                <Video 
                source={video}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                resizeMode={'contain'}
                repeat={true}
                controls={true}
                paused={true}
                onEnd={()=>setOnPress(false)}
                />
        ): (
            <View>
                <Header />
                <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', marginTop: 50}}>
                    <UploadImage/>
                    <TouchableOpacity onPress={()=>setOnPress(true)} style={{alignItems: 'center'}}>
                        <Entypo name="video" color="black" size={60} />
                    </TouchableOpacity>
                </View>
            </View>
        )}
        </View>
    )
}

export default MainScreen