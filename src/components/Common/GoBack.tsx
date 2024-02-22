import { TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import theme from '../../../theme'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getStatusBarHeight } from 'rn-statusbar-height'

const GoBack = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const top = getStatusBarHeight() + 10;

    return (
        <TouchableOpacity style={{ zIndex:1, position: 'absolute', top: top, left :15, }} onPress={()=>navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={theme.backgroundWhite} />
        </TouchableOpacity>
    )
}

export default GoBack