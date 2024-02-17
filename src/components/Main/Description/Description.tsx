import { Image, Button, View, Text, Dimensions, LayoutChangeEvent, SafeAreaView, TouchableWithoutFeedback, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { heightSelector, uriSelector, widthSelector } from '../../../recoil/selector';
import { useRecoilValue } from 'recoil';
import { treeContent } from '../../../constants/imageInfo';
import SoundPlayer from 'react-native-sound-player'

const Description = () => {
  const uri = useRecoilValue(uriSelector);
  const originalWidth = useRecoilValue(widthSelector);
  const originalHeight = useRecoilValue(heightSelector);

  // TODO 서버에서 받아옴 
  const content = treeContent

  const screenWidth = Dimensions.get('window').width;
  const ratio = 0.9;
  const resizeWidth = screenWidth*ratio;
  const resizeHeight = (screenWidth*originalHeight*ratio) / originalWidth;
  const [play, setPlay] = useState(false);

  useEffect(()=>{
    const playSound = async () => {
      try {
        await SoundPlayer.loadSoundFile('main', 'mp3')
      } catch (e) {
        console.log('사운드 파일 재생 오류', e)
      }
    }

    playSound();
    
    SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      if (success) {
        SoundPlayer.pause();
      }
    });

    SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
      console.log('finished loading', success)
    });

    SoundPlayer.addEventListener('FinishedLoadingFile', ({ success }) => {
      console.log('finished loading file', success)
    });
  
    return () => {
      SoundPlayer.pause();
    };
  }, []);

  const onClickButton = () => {
    !play ? SoundPlayer.play() : SoundPlayer.pause()
    setPlay(!play)
  }

  return (
    <SafeAreaView>  
      <GestureHandlerRootView>
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 20, }}>
          <Image source={{ uri: uri }} style={{width: resizeWidth, height: resizeHeight }} />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity>
              <Button title={play ? '일시중지' : '재생'} onPress={onClickButton}/>
            </TouchableOpacity>
          </View>
          <ScrollView 
            style={{ marginTop: 10, width: resizeWidth, height: 220 }} 
            showsVerticalScrollIndicator={false}
          >
            <Text style={{ fontSize: 16 }}>{content}</Text>
          </ScrollView>
        </View>
      </GestureHandlerRootView>    
    </SafeAreaView>
  );
}

export default Description;