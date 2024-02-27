import AsyncStorage from "@react-native-async-storage/async-storage";

export const getContent = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const imageData = await AsyncStorage.getItem('imageData')

  if (userData !== null && imageData !== null) {
    const userInfo = JSON.parse(userData)
    const imageInfo = JSON.parse(imageData)

    const response = await fetch(`${process.env.BASE_URL}/user/content`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'id': userInfo.id,
        'generated-id': '4.jpg', // imageInfo
        'token': userInfo.token
      }
    });

    const data = await response.json();
    return data;
  }
}

export const getContentCoord = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const imageData = await AsyncStorage.getItem('imageData')

  if (userData !== null && imageData !== null) {
    const userInfo = JSON.parse(userData)
    const imageInfo = JSON.parse(imageData)

    const response = await fetch(`${process.env.BASE_URL}/user/content/coord`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'id': userInfo.id,
        'generated-id': '4.jpg', // imageInfo
        'token': userInfo.token
      }
    });

    const data = await response.json();
    return data;
  }
}

export const getContentVideo = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const imageData = await AsyncStorage.getItem('imageData')

  if (userData !== null && imageData !== null) {
    const userInfo = JSON.parse(userData)
    const imageInfo = JSON.parse(imageData)

    const response = await fetch(`${process.env.BASE_URL}/user/content/video`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'id': userInfo.id,
        'generated-id': '4.jpg', // imageInfo
        'token': userInfo.token
      }
    });

    const data = await response.json();
    return data;
  }
}