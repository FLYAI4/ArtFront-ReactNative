import { View, Text, Image, Dimensions, StyleSheet, SafeAreaView, LayoutChangeEvent, NativeSyntheticEvent, ImageLoadEventData } from 'react-native';
import React, { useState } from 'react';

const Coordinates = () => {
  const imageSource = require('../../../assets/image/image1.png');
  const [imageSize, setImageSize] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const originalWidth = 517;
  const originalHeight = 673;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setImageSize({ x, y, width, height });
  }



  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text>
                width: {imageSize.width}px, height: {imageSize.height}px, x: {imageSize.x}, y: {imageSize.y}
            </Text>
            <Image source={imageSource} style={{ marginTop:30, width: screenWidth*0.9, height: (screenWidth*originalHeight*0.9) / originalWidth}} onLayout={handleImageLayout}/>
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
