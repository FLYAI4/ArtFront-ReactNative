import { Image, View, Text, Dimensions, LayoutChangeEvent, SafeAreaView, TouchableWithoutFeedback, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { heightSelector, uriSelector, widthSelector } from '../../../recoil/selector';
import { useRecoilValue } from 'recoil';
import { treeContent } from '../../../constants/imageInfo';

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

  return (
    <SafeAreaView>  
      <GestureHandlerRootView>
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 20, }}>
          <Image source={{ uri: uri }} style={{width: resizeWidth, height: resizeHeight }} />
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