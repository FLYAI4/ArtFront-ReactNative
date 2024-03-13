import { View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';
import ScanDocumentResponse from 'react-native-document-scanner-plugin';
import { useSetRecoilState } from 'recoil';
import { imageState } from '../../../recoil/atoms';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from '../Loading/Loading';

const ScanImage = () => {
    const setImage = useSetRecoilState(imageState);
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const originalWidth = 510;
    const originalHeight = 680;
    const [isLoading, setIsLoading] = useState(false)

    const scanDocument = async () => {
      const { scannedImages, status }: any  = await DocumentScanner.scanDocument({
        maxNumDocuments: 1
      });

      if (status === 'cancel') {
        navigation.reset({routes: [{name: "HomeScreen"}]})
      }

      if (scannedImages.length > 0) {
        setIsLoading(true)
        const scannedImage = scannedImages[scannedImages.length-1];

        // 서버 
        setImage(({
          uri: scannedImage,
          width: originalWidth,
          height: originalHeight
        }));

        const file = new FormData();
        file.append('file', {
          uri: scannedImage,
          type: 'image/png',
          name: 'image.jpg'
        })

        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          const userInfo = JSON.parse(userData);
          
          try {
          const response = await axios.post(`${process.env.BASE_URL}/user/image`, file, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'id': userInfo.id,
              'token': userInfo.token
            }
          });
  
          const data = response.data;
  
          if (data.meta.code === 200) {

            AsyncStorage.setItem(
              'imageData',
              JSON.stringify({
                generated_id: data.data.generated_id
              })
            )
            
            navigation.push('DescriptionScreen');            
          } 
        } catch (error) {
            Alert.alert('작품을 좀 더 정확하게 찍어주세요!', '', [
              {
                text: 'OK',
                onPress: () => { navigation.reset({routes: [{name: "ScanImage"}]}) }
              }
            ])

          }
          
        } else {
          Alert.alert('Login을 먼저 해주세요!')
          navigation.reset({routes: [{name: "HomeScreen"}]})
        }
      } 
    };

    useEffect(() => {
      scanDocument();
    }, []);

    if (isLoading) {
      return (<Loading setIsLoading={setIsLoading} />)
    }

    return (
      <View />
    );
}

export default ScanImage