import { Alert, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native'
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

const Review = () => {
    const uri = useRecoilValue(uriSelector);
    const originalWidth = useRecoilValue(widthSelector);
    const originalHeight = useRecoilValue(heightSelector);

    const ratio = 0.6
    const screenWidth = Dimensions.get('window').width;
    const resizeWidth = screenWidth*ratio;
    const resizeHeight = (screenWidth*originalHeight*ratio) / originalWidth;

    const [like, setLike] = useState(true);
    const [comment, setComment] = useState('');

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView>
        <ScrollView style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <ReviewImage uri={uri} resizeWidth={resizeWidth} resizeHeight={resizeHeight}/>
            <ReviewButton like={like} setLike={setLike} />
            <ReviewText comment={comment} setComment={setComment}/>
            <TouchableOpacity 
                style={{ marginLeft: 20, marginRight: 20, backgroundColor: theme.olive, marginBottom: 20, borderRadius: 20}}
                // onPress={()=>Alert.alert(`좋아요 버튼을 눌렀나요? ${like} ${comment}` )}>
                onPress={()=>navigation.push('HomeScreen')}>
                <AppText style={{ padding: 15, fontWeight: '800', fontSize: 18, color: theme.backgroundWhite,  textAlign: 'center'}}>소감 남기기</AppText>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Review