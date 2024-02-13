import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { useRecoilState } from 'recoil';
import { imageState } from '../../../recoil/atoms';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { height, width } from '../../../constants/imageInfo';

const ScanImage = () => {
    const [image, setImage] = useRecoilState(imageState);
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    // TODO: original width, height 
    const originalWidth = width;
    const originalHeight = height;

    const scanDocument = async () => {
      const { scannedImages }: any  = await DocumentScanner.scanDocument({
        maxNumDocuments: 1
      });
  
      if (scannedImages.length > 0) {
        const scannedImage = scannedImages[scannedImages.length-1];
        setImage(({
          uri: scannedImage,
          width: originalWidth,
          height: originalHeight
        }));
        console.log(`PickImage: ${image.uri}`);
        console.log(`ScanImage: ${scannedImage}`);
        navigation.push('DescriptionScreen');
      }
    };
  
    useEffect(() => {
      scanDocument();
    }, []);

    return (
      <View />
    );
}

export default ScanImage