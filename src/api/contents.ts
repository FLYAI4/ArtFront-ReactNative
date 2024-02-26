import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.BASE_URL 

export const getContentText = async () => {
  const userData = await AsyncStorage.getItem('userData');
  if (userData !== null) {
    const userInfo = JSON.parse(userData);

    const response = await fetch(`${process.env.BASE_URL}/user/content`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'id': userInfo.id,
        'generated-id': '4.jpg',
        'token': userInfo.token
      }
    });

    const data = await response.json();
    return data;
  }
}

export const getContentCoord = async () => {
  const userData = await AsyncStorage.getItem('userData');
  if (userData !== null) {
    const userInfo = JSON.parse(userData);
    const response = await fetch(`${BASE_URL}/user/content/coord`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'id': userInfo.id,
        'generated-id': '4.jpg',
        'token': userInfo.token
      }
    });

    const data = await response.json();
    return data;
  }
}