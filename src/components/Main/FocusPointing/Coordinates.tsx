import { View, Text, Image, Dimensions, SafeAreaView, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import ImageEditor from "@react-native-community/image-editor";
import { heightSelector, uriSelector, widthSelector } from '../../../recoil/selector';
import { useRecoilValue } from 'recoil';
import { infoDict } from '../../../constants/imageInfo';
import { removeUnderScore } from '../../../utils/utils';
import AppText from '../../Common/Text/AppText';
import NextPage from '../../Common/NextPage';
import theme from '../../../../theme';

const Coordinates = () => {
  const uri = useRecoilValue(uriSelector);
  const originalWidth = useRecoilValue(widthSelector);
  const originalHeight = useRecoilValue(heightSelector);

  // image resize 
  const [imageSize, setImageSize] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const resizeHeight = (screenWidth*originalHeight) / originalWidth;
  const [position, setPosition] = useState({left: 0, top: 0});

  // keyword, context 
  const [keyword, setKeyword] = useState("Box를 클릭해주세요!");
  const [context, setContext] = useState("ArtVisionXperience이 선정한 핵심포인트입니다");

  const [cropPath, setCropPath] = useState("");
  const [cropData, setCropData] = useState({
    offset: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
    displaySize: { width: 0, height: 0 },
  });

  const [focusBox, setFocusBox] = useState(false);

  // TODO 서버에서 받아옴 
  const dict = infoDict

  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setImageSize({ x, y, width, height });
  }

  const calculateCoordinates = (list: number[][]) => {
    const [x1, y1, x2, y2] = list[0];
    const x1_ = imageSize.width / originalWidth  * x1 + imageSize.x;
    const y1_ = imageSize.height / originalHeight  * y1 + imageSize.y;
    const x2_ = imageSize.width / originalWidth * x2 + imageSize.x;
    const y2_ = imageSize.height / originalHeight  * y2 + imageSize.y;
    return [x1_, y1_, x2_, y2_];
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const cropImage = async (coordinates: number[]) => {
    const left = coordinates[0]
    const top =  coordinates[1]
    setPosition({left, top});

    const x1 = coordinates[0] * (originalWidth / screenWidth);
    const y1 = coordinates[1] * (originalHeight / resizeHeight);
    const x2 = coordinates[2] * (originalWidth / screenWidth);
    const y2 = coordinates[3] * (originalHeight / resizeHeight);

    setCropData({
      offset: { x: x1, y: y1 },
      size: {
        width: (x2 - x1),
        height: (y2 - y1),
      },
        displaySize: {
          width: coordinates[2] - coordinates[0],
          height: coordinates[3] - coordinates[1],
        },
      });
  };

  useEffect(()=>{
    if (focusBox === false) {
      setCropData({
        offset: { x: 0, y: 0 },
        size: { width: 0, height: 0 },
        displaySize: { width: 0, height: 0 },
      });

      setKeyword("Box를 클릭해주세요!")
      setContext("당신만의 AI 도슨트 Acent가 선정한 작품의 핵심포인트입니다. Box를 눌러 설명을 확인하세요.")
    }
  }, [focusBox])

  useEffect(()=>{
    const fetchData = async () => {
      try { 
        const url = await ImageEditor.cropImage(uri, cropData);
        setCropPath(url);
      } catch (error) {
        console.log("cropImage 오류:", error);
      }
    }

    fetchData();
  
  }, [cropData, uri])
  
  const handleClickBounding = (key: string, coordinates: number[]) => {
    setFocusBox(true);
    setKeyword(key);
    setContext(dict[key as keyof typeof dict]['context']);

    cropImage(coordinates);
  };

  const renderBoundingBoxes = () => {
    return Object.keys(dict).map((key: string, index: number) => {
        const coordinates: ReturnType<typeof calculateCoordinates> = calculateCoordinates(dict[key as keyof typeof dict]['coord']);
        return (
            <TouchableOpacity 
                key={index}
                style={{position: 'absolute',left: coordinates[0], top: coordinates[1], width: coordinates[2] - coordinates[0], height: coordinates[3] - coordinates[1], borderWidth: 3, borderColor: getRandomColor(),  opacity: focusBox ? 0.2 : 1.0 }}
                onPress={()=> handleClickBounding(key, coordinates)}>
                <View key={index}/>
            </TouchableOpacity>
        )
    })
  }

  return (
    <SafeAreaView>
        <GestureHandlerRootView>
          <View 
            style={{width: '100%', height: '100%' }}>
              { cropPath && <Image source={{uri: cropPath}} style={{position: 'absolute', zIndex: 1, width: cropData.displaySize.width, height: cropData.displaySize.height,  left: position.left, top: position.top }} />}
              <TouchableOpacity onPress={()=>setFocusBox(false)} activeOpacity={1}>
                <Image source={{uri: uri}} style={{  width: screenWidth, height: resizeHeight, opacity: focusBox ? 0.2 : 1.0 }} onLayout={handleImageLayout}/>
              </TouchableOpacity>
              {renderBoundingBoxes()}              
              <View style={{ marginHorizontal: 20, marginTop: 20}} >
                <AppText style={{color: theme.olive, fontSize: 28, fontWeight: 600, marginBottom: 20 }}>{removeUnderScore({keyword: keyword})}</AppText>
                <ScrollView style={{ height: 600, width: screenWidth-90}}>
                  <AppText style={{ color: theme.olive, fontSize: 16}}>{context}</AppText>
                </ScrollView>
              </View>
          </View>
        </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default Coordinates;
