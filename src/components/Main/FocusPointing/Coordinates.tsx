import { View, Text, Image, Dimensions, SafeAreaView, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import ImageEditor from "@react-native-community/image-editor";
import { heightSelector, uriSelector, widthSelector } from '../../../recoil/selector';
import { useRecoilValue } from 'recoil';

const Coordinates = () => {
  const uri = useRecoilValue(uriSelector);
  const originalWidth = useRecoilValue(widthSelector);
  const originalHeight = useRecoilValue(heightSelector);

  // image resize 
  const [imageSize, setImageSize] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const ratio = 0.9;
  const resizeWidth = screenWidth*ratio;
  const resizeHeight = (screenWidth*originalHeight*ratio) / originalWidth;
  const [position, setPosition] = useState({left: 0, top: 0});

  // keyword, context 
  const [keyword, setKeyword] = useState("Bounding Box를 클릭해주세요!");
  const [context, setContext] = useState("ArtVisionXperience에서 선정한 핵심포인트입니다");

  const [cropPath, setCropPath] = useState("");
  const [cropData, setCropData] = useState({
    offset: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
    displaySize: { width: 0, height: 0 },
  });

  const [focusBox, setFocusBox] = useState(false);

  // TODO 서버에서 받아옴 
  const dict = {
    "나무": {
        "coord": [
            [
                134,
                96,
                391,
                566
            ]
        ], 
        "context" : "스타일은 약간 단순화되어 있으며, 넓은 색상 영역이 하늘, 초목, 나무의 수직 형태를 구분합니다. 그림은 눈길을 위로 끌어올리는 높고 가느다란 포플러 나무들이 지배하는 풍경을 그립니다. 나무들 아래에는 거의 성숙하기 직전의 농작물을 암시할 수 있는 초록색 필드가 보입니다. 나무들 사이에는 작은 집이나 건물이 있어, 아니면 자연적인 장면에 인간 요소를 추가합니다. 작가는 나무의 수직선과 하늘과 필드의 수평선 사이의 대조를 이용합니다."
    },
    "하늘": {
        "coord": [
            [
                0,
                0,
                517,
                96
            ],
        ],
        "context": "스타일은 약간 단순화되어 있으며, 넓은 색상 영역이 하늘, 초목, 나무의 수직 형태를 구분합니다. 배경은 미묘한 구름 디테일이 있는 연하늘로, 평온한 대기 조건을 암시합니다. 작가는 나무의 수직선과 하늘과 필드의 수평선 사이의 대조를 이용합니다."
    },
    "필드": {
        "coord": [
            [
                3,
                566,
                514,
                673
            ],
        ],
        "context": "나무들 아래에는 거의 성숙하기 직전의 농작물을 암시할 수 있는 초록색 필드가 보입니다. 작가는 나무의 수직선과 하늘과 필드의 수평선 사이의 대조를 이용합니다."
    }
}

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

    const x1 = coordinates[0] * (originalWidth / resizeWidth);
    const y1 = coordinates[1] * (originalHeight / resizeHeight);
    const x2 = coordinates[2] * (originalWidth / resizeWidth);
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

      setKeyword("")
      setContext("")
    }
  }, [focusBox])

  useEffect(()=>{
    const fetchData = async () => {
      const url = await ImageEditor.cropImage(uri, cropData);
      setCropPath(url);
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
            style={{width: '100%', height: screenHeight-55, display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 100,}}>
              { cropPath && <Image source={{uri: cropPath}} style={{position: 'absolute', zIndex: 1, width: cropData.displaySize.width, height: cropData.displaySize.height,  left: position.left, top: position.top }} />}
              <TouchableOpacity onPress={()=>setFocusBox(false)} activeOpacity={1}>
                <Image source={{uri: uri}} style={{  width: resizeWidth, height: resizeHeight, opacity: focusBox ? 0.2 : 1.0 }} onLayout={handleImageLayout}/>
              </TouchableOpacity>
              {renderBoundingBoxes()}
              <Text style={{marginTop: 10, marginBottom: 10, fontSize: 24, fontWeight: '600'}} >{keyword}</Text>
              
              <ScrollView style={{width: resizeWidth }}>
                  <Text style={{"fontSize":16 }}>{context}</Text>
              </ScrollView>
              
          </View>
        </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default Coordinates;
