import { View, Text, Image, Dimensions, StyleSheet, SafeAreaView, LayoutChangeEvent, NativeSyntheticEvent, ImageLoadEventData } from 'react-native';
import React, { useState } from 'react';

const Coordinates = () => {
  const imageSource = require('../../../assets/image/image1.png');
  const [imageSize, setImageSize] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const originalWidth = 517;
  const originalHeight = 673;
  const screenWidth = Dimensions.get('window').width;
  const resizeWidth = screenWidth*0.9;
  const resizeHeight = (screenWidth*originalHeight*0.9) / originalWidth;

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

  const coordinates = calculateCoordinates([0, 0, 517, 96]);


  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text>
                width: {imageSize.width}px, height: {imageSize.height}px, x: {imageSize.x}, y: {imageSize.y}
            </Text>
            <Image source={imageSource} style={{ marginTop:30, width: resizeWidth, height: resizeHeight }} onLayout={handleImageLayout}/>
            <View style={[styles.box, { left: coordinates[0], top: coordinates[1], width: coordinates[2] - coordinates[0], height: coordinates[3] - coordinates[1] }]} />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default Coordinates;
