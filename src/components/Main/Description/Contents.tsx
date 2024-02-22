import {  Image, Button, View, Text, Dimensions, LayoutChangeEvent, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, } from 'react-native'
import React,  { useEffect, useState, useRef }  from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { heightSelector, uriSelector, widthSelector } from '../../../recoil/selector';
import { useRecoilValue } from 'recoil';
import { treeContent } from '../../../constants/imageInfo';
import SoundPlayer from 'react-native-sound-player'
import { useIsFocused } from '@react-navigation/native';
import AppText from '../../Common/Text/AppText';
import * as Progress from 'react-native-progress';
import theme from '../../../../theme';
import Feather from 'react-native-vector-icons/Feather'
import NextPage from '../../Common/NextPage';

const Contents = () => {
    const uri = useRecoilValue(uriSelector);
    const originalWidth = useRecoilValue(widthSelector);
    const originalHeight = useRecoilValue(heightSelector);

    const content = treeContent

    const screenWidth = Dimensions.get('window').width;
    const ratio = 1.0;
    const resizeWidth = screenWidth*ratio;
    const resizeHeight = (screenWidth*originalHeight*ratio) / originalWidth;
    const [play, setPlay] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null); 
    const [currentTime, setCurrentTime] = useState(0);
    const [durationTime, setDurationTime] = useState(0);
    const [height, setHeight] = useState(0)
    const [isEnd, setIsEnd] = useState(false);
    const [progressTime, setProgressTime] = useState(0);
    // const progressTime = (!isEnd && currentTime>0) ? (currentTime/durationTime) : durationTime;

    const measureTextLayout = async (e: LayoutChangeEvent) => {
        const { height } = e.nativeEvent.layout;
        setHeight(height);
    }
    
    const isFocused = useIsFocused(); // goBack으로 이전 페이지 돌아왔는지 체크 

    useEffect(()=>{
        if (isFocused || isEnd) {
            setPlay(false)
        }
    }, [isFocused, isEnd]);

    const scrollView = async () => {
        if (isEnd && !play) {
            return;
        }
        
        if (scrollViewRef.current) {
            const { duration } = await SoundPlayer.getInfo();
            setDurationTime(duration);

            const scrollY = (currentTime / durationTime) * height - 10
            const scrollPosition = (scrollY > 0) ? scrollY : 0;
            scrollViewRef.current.scrollTo({ y:scrollPosition, animated: false });
        }
    }

    useEffect(()=>{
        scrollView() 
        if (currentTime>0) {
            setProgressTime(currentTime / durationTime);
        }
        
    }, [play, currentTime]);

    useEffect(()=>{
        const playSound = async () => {
            try {
                SoundPlayer.loadSoundFile('main', 'mp3')
            } catch (e) {
                console.log('사운드 파일 재생 오류', e)
            }
        }

        playSound();

        SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            if (success) {
                setPlay(false)
                setIsEnd(true)
            }
        });

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

    const interval = setInterval(updateCurrentTime, 100);

    return () => {
      clearInterval(interval);
    }
  });

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <View  style={{  zIndex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Image source={{ uri: uri }} style={{ width: resizeWidth, height: resizeHeight }} />
            <View style={{ display: 'flex', flexDirection: 'row', margin: 20, alignContent:'center'}}>
                <View style={{ marginRight: 10, display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <Progress.Bar progress={progressTime} width={resizeWidth-75} height={15} color={theme.cocoa}/>
                </View>
                
                <TouchableOpacity onPress={onClickButton}>
                    <Feather name={play ? 'pause' : 'play'} size={35} color={theme.cocoa}/>
                </TouchableOpacity>
            </View>
            <View> 
                <ScrollView 
                ref={scrollViewRef}
                contentContainerStyle={{ width: resizeWidth-40, height: 830}} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                >
                <AppText style={{ fontSize: 16 }} onLayout={measureTextLayout}>{content}</AppText>
            </ScrollView>
          </View>
        </View>
        
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default Contents