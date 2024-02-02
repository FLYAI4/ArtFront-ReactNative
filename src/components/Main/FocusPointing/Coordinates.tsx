import { View, Text, Image, Dimensions, SafeAreaView, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const Coordinates = () => {
  // image resize 
  const imageSource = require('../../../assets/image/image1.png');
  const [imageSize, setImageSize] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const originalWidth = 517;
  const originalHeight = 673;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const ratio = 0.9;
  const resizeWidth = screenWidth*ratio;
  const resizeHeight = (screenWidth*originalHeight*ratio) / originalWidth;

  // keyword, context 
  const [keyword, setKeyword] = useState("");
  const [context, setContext] = useState("");

  const dict = {
    "trees": {
        "coord": [
            [
                134,
                96,
                391,
                566
            ]
        ], 
        "context" : "It features a row of tall, slender poplar trees set against a light blue sky with wispy clouds. The greenery of the trees contrasts with the muted tones of the sky and the golden-green hue of the field in the foreground, suggesting a season like late spring or early summer. Below the trees at the center of the composition is a small white building, perhaps a house or shed, which introduces a human element into the otherwise natural landscape"
    },
    "sky": {
        "coord": [
            [
                0,
                0,
                517,
                96
            ],
        ],
        "context": "It features a row of tall, slender poplar trees set against a light blue sky with wispy clouds. The greenery of the trees contrasts with the muted tones of the sky and the golden-green hue of the field in the foreground, suggesting a season like late spring or early summer"
    },
    "field": {
        "coord": [
            [
                3,
                566,
                514,
                673
            ],
        ],
        "context": "The greenery of the trees contrasts with the muted tones of the sky and the golden-green hue of the field in the foreground, suggesting a season like late spring or early summer"
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

 const handleClickBounding = (key: string) => {
   setKeyword(key);
   setContext(dict[key as keyof typeof dict]['context']);
 };

  const renderBoundingBoxes = () => {
    return Object.keys(dict).map((key: string, index: number) => {
        const coordinates: ReturnType<typeof calculateCoordinates> = calculateCoordinates(dict[key as keyof typeof dict]['coord']);
        return (
            <TouchableOpacity 
                style={{position: 'absolute',left: coordinates[0], top: coordinates[1], width: coordinates[2] - coordinates[0], height: coordinates[3] - coordinates[1], borderWidth: 3, borderColor: getRandomColor() }}
                onPress={()=> handleClickBounding(key)}>
                <View key={index}/>
            </TouchableOpacity>
        )
    })
  }

  return (
    <SafeAreaView>
        <GestureHandlerRootView>
        <View style={{width: '100%', height: screenHeight-55, display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 100,}}>
            <Image source={imageSource} style={{  width: resizeWidth, height: resizeHeight }} onLayout={handleImageLayout}/>
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
