// import RNFS from 'react-native-fs';

// type responseType = {
//     data: string;
//     unique: string;
//   };

// // TODO 검증필요
// export const storeGifRNFS = ({response}: {response: responseType}) => {
//     const gifData = response.data;
//     const fileName = response.unique;

//     const filePath = `${RNFS.DocumentDirectoryPath}/opencv-loading.gif`;
    
//     // gif 파일을 
//     RNFS.writeFile(filePath, gifData, 'base64')
//     .then(()=>{
//         console.log(`${fileName} 이 ${filePath}에 저장되었습니다.`);
//     })
//     .catch((error) => {
//         console.log('gif 파일 저장 중 오류가 발생했습니다:', error);
//     })
// }

export const removeUnderScore = ({keyword}: {keyword: string}) => {
    return keyword.replace(/_/g, ' ');
}

export const b64toBlob = (b64Data: string) => {
    const contentType = 'image/png';
    const image_data = atob(b64Data);
    const arraybuffer: any = new ArrayBuffer(image_data.length);
    const view = new Uint8Array(arraybuffer);

    for (let i=0; i<image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
    }

    const blobOptions: BlobOptions = { type: contentType, lastModified: Date.now() };

    return new Blob([arraybuffer], blobOptions);
}