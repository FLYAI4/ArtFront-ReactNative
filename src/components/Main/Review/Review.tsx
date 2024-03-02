import { Alert, TouchableOpacity, View, SafeAreaView, Dimensions } from 'react-native'
import React, {useState} from 'react'
import ReviewImage from './ReviewImage'
import ReviewButton from './ReviewButton'
import ReviewText from './ReviewText'
import AppText from '../../Common/Text/AppText'
import theme from '../../../../theme'
import { heightSelector, uriSelector, widthSelector } from '../../../recoil/selector';
import { useRecoilValue } from 'recoil';
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useMutation } from 'react-query'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Review = () => {
    const uri = useRecoilValue(uriSelector);
    const originalWidth = useRecoilValue(widthSelector);
    const originalHeight = useRecoilValue(heightSelector);

    const ratio = 0.6
    const screenWidth = Dimensions.get('window').width;
    const resizeWidth = screenWidth*ratio;
    const resizeHeight = (screenWidth*originalHeight*ratio) / originalWidth;

    const [like, setLike] = useState(true);
    const [content, setContent] = useState('');

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const reviewMutation = useMutation(async () => {
      const data = {
        like_status: like,
        review_content: content
      }
      const userData = await AsyncStorage.getItem('userData');
      const imageData = await AsyncStorage.getItem('imageData');

      if (userData !== null && imageData !== null) {
        const userInfo = JSON.parse(userData);
        const imageInfo = JSON.parse(imageData);

        const response = await axios.post(`${process.env.BASE_URL}/user/content/review`, data, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'id': userInfo.id,
            'generated-id': imageInfo.generated_id,
            'token': userInfo.token
          }
        })
        return response.data;
      }
    });

  const handleSubmit = async () => {
    const response = await reviewMutation.mutateAsync();

    if (response.data.id) {
      Alert.alert('Acent를 통해 작품을 감상해주셔서 감사합니다. 다른 작품도 감상해보세요!')
      navigation.reset({routes: [{name: "HomeScreen"}]})
    }
    
  }

  return (
    <SafeAreaView>
        <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <ReviewImage uri={uri} resizeWidth={resizeWidth} resizeHeight={resizeHeight}/>
            <ReviewButton like={like} setLike={setLike} />
            <ReviewText content={content} setContent={setContent}/>
            <TouchableOpacity 
                style={{ marginLeft: 20, marginRight: 20, backgroundColor: theme.olive, marginBottom: 20, borderRadius: 20}}
                onPress={handleSubmit}>
                <AppText style={{ padding: 15, fontWeight: '800', fontSize: 18, color: theme.backgroundWhite,  textAlign: 'center'}}>소감 남기기</AppText>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Review