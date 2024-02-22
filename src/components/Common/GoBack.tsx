import { TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import theme from '../../../theme'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

const GoBack = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    return (
        <TouchableOpacity style={{ zIndex:1, position: 'absolute', top: 30, left :15, }} onPress={()=>navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={theme.backgroundWhite} />
        </TouchableOpacity>
    )
}

export default GoBack