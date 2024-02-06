// import { Image } from "react-native";

// /**
//  * 이미지를 조절하고 새로운 URL을 생성하는 함수
//  * @param {string} imagePath 이미지의 로컬 경로 
//  * @param {number} desiredWidth 원하는 너비
//  * @param {number} desiredHeight 원하는 높이
//  * @return {Promise<string>} 조절된 이미지의 URL을 포함하는 Promise
//  */
// export const resizeImage = async (imagePath: string, desiredWidth: number, desiredHeight: number): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     Image.getSize(imagePath, (originalWidth, originalHeight) => {
//       const resizedImageURL = `${imagePath}?width=${desiredWidth}&height=${desiredHeight}`;
//       resolve(resizedImageURL);
//     }, (error) => {
//       console.log('이미지를 가져오는 중에 오류가 발생했습니다:', error);
//       reject(error);
//     });
//   });
// };
