import { View, Text, Image, Dimensions, StyleSheet, SafeAreaView, LayoutChangeEvent, NativeSyntheticEvent, ImageLoadEventData, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Coordinates = () => {
  // image resize 
  const imageSource = require('../../../assets/image/image1.png');
  const [imageSize, setImageSize] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const originalWidth = 517;
  const originalHeight = 673;
  const screenWidth = Dimensions.get('window').width;
  const resizeWidth = screenWidth*0.9;
  const resizeHeight = (screenWidth*originalHeight*0.9) / originalWidth;

  // keyword, context 
  const [clickIdx, setClickIdx] = useState(0); // keyword 의 idx
  const [keyword, setKeyword] = useState("");
  const [context, setContext] = useState("");

  const dict = {
    "trees": [
        [
            134,
            96,
            391,
            466
        ],
        "It features a row of tall, slender poplar trees set against a light blue sky with wispy clouds. The greenery of the trees contrasts with the muted tones of the sky and the golden-green hue of the field in the foreground, suggesting a season like late spring or early summer. Below the trees at the center of the composition is a small white building, perhaps a house or shed, which introduces a human element into the otherwise natural landscape"
    ],
    "sky": [
        [
            0,
            0,
            517,
            96
        ],
        "It features a row of tall, slender poplar trees set against a light blue sky with wispy clouds. The greenery of the trees contrasts with the muted tones of the sky and the golden-green hue of the field in the foreground, suggesting a season like late spring or early summer"
    ],
    "field": [
        [
            3,
            466,
            514,
            673
        ],
        "The greenery of the trees contrasts with the muted tones of the sky and the golden-green hue of the field in the foreground, suggesting a season like late spring or early summer"
    ]
  }


  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setImageSize({ x, y, width, height });
  }

  const calculateCoordinates = (list: number[]) => {
    const [x1, y1, x2, y2] = list;
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

  const renderBoundingBoxes = () => {
    return Object.values(dict).map((item: any, index: number) => {
      const coordinates = calculateCoordinates(item[0]);
      return (
        <View key={index} style={{position: 'absolute', borderWidth: 3, borderColor: getRandomColor(), left: coordinates[0], top: coordinates[1], width: coordinates[2] - coordinates[0], height: coordinates[3] - coordinates[1] }} />
      );
    });
  }

  return (
    <SafeAreaView>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                width: {imageSize.width}px, height: {imageSize.height}px, x: {imageSize.x}, y: {imageSize.y}
            </Text>
            <Image source={imageSource} style={{ marginTop:30, width: resizeWidth, height: resizeHeight }} onLayout={handleImageLayout}/>
            {renderBoundingBoxes()}
        </View>
    </SafeAreaView>
  );
}

export default Coordinates;
