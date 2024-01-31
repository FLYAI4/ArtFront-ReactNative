import { Image, View, Platform, ActionSheetIOS, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { launchImageLibrary, launchCamera, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import UploadModeModal from '../Common/UploadModeModal';

const imagePickerOption: ImageLibraryOptions & CameraOptions = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
  cameraType: 'back',
};

const UploadImage = () => {
  const [selectedImageUri, setSelectedImageUri] = useState('');

  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    setSelectedImageUri(res.assets[0].uri);
    console.log('PickImage', res);
  };

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);


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
    <>
      <View>
       {selectedImageUri ? (
          <Image source={{ uri: selectedImageUri }} style={{ width: 200, height: 200}} />
        ) : (
          <TouchableOpacity onPress={modalOpen}>
            <Entypo name="camera" color="black" size={60} />
          </TouchableOpacity>
        )}
      </View>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary} />
    </>
  );
};

export default UploadImage;
