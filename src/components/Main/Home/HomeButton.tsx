import { Alert, View, TouchableOpacity, Platform, ActionSheetIOS, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import AppText from '../../Common/Text/AppText'
import theme from '../../../../theme'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import UploadModeModal from '../../Common/UploadModeModal'
import { width, height } from '../../../constants/imageInfo'
import { useRecoilState } from 'recoil'
import { imageState } from '../../../recoil/atoms'
import { launchImageLibrary, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import { useMutation, useQuery } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { getContent } from '../../../api/contents'
import Loading from '../Loading/Loading'

const imagePickerOption: ImageLibraryOptions & CameraOptions = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
    cameraType: 'back',
  };

const HomeButton = () => {
    const [selectedImageUri, setSelectedImageUri] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useRecoilState(imageState);

    const handleImageChange = () => {
      if (selectedImageUri) {
        setImage({
          uri: selectedImageUri,
          width: 510,
          height: 680
        })
      }
    }
    
    // 선택 사진 또는 촬영된 사진 정보
    const onPickImage = async (res: any) => {
      if (res.didCancel || !res) {
        return;
      }
      setIsLoading(true)
        
      setSelectedImageUri(res.assets[0].uri);
      handleImageChange()

      const file = new FormData();
    
      file.append('file', {
        uri: res.assets[0].uri,
        type: res.assets[0].type,
        name: res.assets[0].fileName
      })

      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const userInfo = JSON.parse(userData);
        
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
          navigation.push('DescriptionScreen')
        }
        
      } else {
        Alert.alert('Login을 먼저 해주세요!')
        navigation.push('LoginScreen');
      }
      return res.assets[0].uri
    };

    // 카메라 촬영
    const onLaunchCamera = () => {
        navigation.push('ScanImage')
    };

    // 갤러리에서 사진 선택
    const onLaunchImageLibrary = () => {
      launchImageLibrary(imagePickerOption, onPickImage);
    };

    const modalOpen = () => {
        if (Platform.OS === 'android') { // 안드로이드
        setModalVisible(true);
        } else { // iOS
        ActionSheetIOS.showActionSheetWithOptions(
            {
            options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
            cancelButtonIndex: 2,
            },
            (buttonIndex) => {
            if (buttonIndex === 0) {
                onLaunchCamera();
            } else if (buttonIndex === 1) {
                onLaunchImageLibrary();
            }
            },
        );
        }
    };

    if (isLoading) {
      return (<Loading setIsLoading={setIsLoading}/>)
    }

  return (
    <View style={{ width: '100%', position: 'absolute', bottom: 43, left: 0, right: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity onPress={modalOpen}>
            <View style={{ borderRadius: 55, overflow: 'hidden', borderWidth: 2, borderColor: theme.olive, }}>
                <AppText style={{ width: 350, padding: 15,  backgroundColor: theme.olive, color: theme.backgroundWhite, fontWeight: '600', fontSize: 24, textAlign: 'center', }}>작품 감상하러 가기</AppText>
            </View>
        </TouchableOpacity>
        <UploadModeModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onLaunchCamera={onLaunchCamera}
            onLaunchImageLibrary={onLaunchImageLibrary} />
    </View>
  )
}

export default HomeButton