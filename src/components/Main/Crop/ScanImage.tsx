import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const ScanImage = () => {
    const [scannedImage, setScannedImage] = useState<string | undefined>();
  
    const scanDocument = async () => {
      // 문서 스캐너 시작
      const { scannedImages }: any = await DocumentScanner.scanDocument();
  
      // 스캔된 이미지 파일 경로의 배열을 받아옵니다.
      if (scannedImages.length > 0) {
        // 첫 번째 스캔된 이미지를 보기 위해 이미지 소스를 설정합니다.
        setScannedImage(scannedImages[0]);
      }
    };
  
    useEffect(() => {
      // 로드 시 scanDocument 호출
      scanDocument();
    }, []);
  
    return (
      <Image
        resizeMode="contain"
        style={{ width: '100%', height: '100%' }}
        source={{ uri: scannedImage }}
      />
    );
}

export default ScanImage