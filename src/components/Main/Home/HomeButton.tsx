import { View, TouchableOpacity, Platform, ActionSheetIOS } from 'react-native'
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

    const originalWidth = width;
    const originalHeight = height;

    const [image, setImage] = useRecoilState(imageState);
    const handleImageChange = () => {
      if (selectedImageUri) {
        setImage({
          uri: selectedImageUri,
          width: originalWidth,
          height: originalHeight
        })
      }
    }

    // 선택 사진 또는 촬영된 사진 정보
    const onPickImage = (res: any) => {
        if (res.didCancel || !res) {
        return;
        }
        setSelectedImageUri(res.assets[0].uri);
        console.log('PickImage', res);
        navigation.push('DescriptionScreen')
    };

    useEffect(()=>{
        handleImageChange()
    }, [selectedImageUri])

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
        setModalVisible(true); // visible = true
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

  return (
    <View style={{ width: '100%', position: 'absolute', bottom: 43, left: 0, right: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity onPress={modalOpen}>
            <View style={{ borderRadius: 55, overflow: 'hidden', borderWidth: 2, borderColor: theme.olive, }}>
                <AppText style={{ width: 350, padding: 20,  backgroundColor: theme.olive, color: theme.backgroundWhite, fontWeight: '600', fontSize: 24, textAlign: 'center', }}>작품2 감상하러 가기</AppText>
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