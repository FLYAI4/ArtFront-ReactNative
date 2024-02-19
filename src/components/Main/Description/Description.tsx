import { Image, Button, View, Text, Dimensions, LayoutChangeEvent, SafeAreaView, TouchableOpacity, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { GestureHandlerRootView, ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import { heightSelector, uriSelector, widthSelector } from '../../../recoil/selector';
import { useRecoilValue } from 'recoil';
import { treeContent } from '../../../constants/imageInfo';
import SoundPlayer from 'react-native-sound-player'
import { useIsFocused } from '@react-navigation/native';

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
  const scrollViewRef = useRef<ScrollView>(null); 
  const [currentTime, setCurrentTime] = useState(0);
  const [durationTime, setDurationTime] = useState(0);
  const [height, setHeight] = useState(0)

  const measureTextLayout = async (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  }
  
  const isFocused = useIsFocused(); // goBack으로 이전 페이지 돌아왔는지 체크 
  
  useEffect(()=>{
    setPlay(false)
  }, [isFocused]);

  const scrollView = async () => {
    if (scrollViewRef.current) {
      const { duration } = await SoundPlayer.getInfo();
      setDurationTime(duration);

      if ( durationTime - currentTime < 1 ) {
        setPlay(false);
      } 

      const scrollPosition = ((currentTime / durationTime) * height - 10) > 0 ? (currentTime/durationTime) * height - 10 : 0;
      scrollViewRef.current.scrollTo({ y:scrollPosition, animated: false });
    }
  }

  useEffect(()=>{
    scrollView()    
  }, [play, currentTime]);

  useEffect(()=>{
    console.log('sound load')

    const playSound = async () => {
      try {
        SoundPlayer.loadSoundFile('main', 'mp3')
      } catch (e) {
        console.log('사운드 파일 재생 오류', e)
      }
    }

    playSound();

    // SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
    //   if (success) {
    //     SoundPlayer.pause();
    //   }
    // });

    // SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
    //   console.log('finished loading', success)
    // });

    // SoundPlayer.addEventListener('FinishedLoadingFile', ({ success }) => {
    //   console.log('finished loading file', success)
    // });

    return () => {
      setPlay(false);
      SoundPlayer.pause();
    };
  }, []);

  const onClickButton = () => {
    !play ? SoundPlayer.play() : SoundPlayer.pause()
    setPlay(!play)
  }

  useEffect(()=>{
    const updateCurrentTime = async () => {
      try { 
        const { currentTime } = await SoundPlayer.getInfo();
        setCurrentTime(currentTime);
      } catch (error) {
        console.log(`currentTime error`, error);
      }
    };

    const interval = setInterval(updateCurrentTime, 1000);

    return () => {
      clearInterval(interval);
    }
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;

    if (isEndReached) {
      console.log('finish')
    }
  };

  return (
    <SafeAreaView>  
      <GestureHandlerRootView>
        <View style={{  width: '100%', height: '95%', display: 'flex', alignItems: 'center', marginTop: 20 }}>
          <Image source={{ uri: uri }} style={{ width: resizeWidth, height: resizeHeight }} />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity >
              <Button title={play ? '일시중지' : '재생'}  onPress={onClickButton}/>
            </TouchableOpacity>
          </View>
          <View> 
            <ScrollView 
              ref={scrollViewRef}
              contentContainerStyle={{ marginTop: 10, marginBottom: 20, width: resizeWidth, height: 800}} 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onScroll={handleScroll}
            >
              <Text style={{ fontSize: 16 }} onLayout={measureTextLayout}>{content}</Text>
          </ScrollView>
          </View>
        </View>
      </GestureHandlerRootView>    
    </SafeAreaView>
  );
  

}

export default Description;