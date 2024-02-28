import { View, TextInput } from 'react-native'
import React from 'react'
import theme from '../../../../theme'

type ReviewTextProps = {
    content: string;
    setContent: (value: string) => void;
}

const ReviewText = ({content, setContent}: ReviewTextProps) => {
  return (
    <View style={{ margin:20, borderWidth: 2, borderColor: theme.olive, borderRadius: 20}}>
      <TextInput 
        multiline={true} 
        style={{fontFamily: 'NanumMyeongjo', fontSize:14,  borderRadius: 20, height: 150, backgroundColor: 'white', paddingTop: 20, padding: 20}}
        placeholder='작품에 대한 감상평을 자유롭게 남겨주세요.'
        value={content}
        onChangeText={(text) => setContent(text)}
        />
    </View>
  )
}

export default ReviewText