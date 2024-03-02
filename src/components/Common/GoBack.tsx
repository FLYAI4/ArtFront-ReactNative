import { TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import theme from '../../../theme'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getStatusBarHeight } from 'rn-statusbar-height'
import HomeScreen from '../../screens/Main/HomeScreen'

type GoBackProps = {
    cocoa?: boolean
    isDescription?: boolean
}

const GoBack = ({cocoa, isDescription}:GoBackProps) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const top = getStatusBarHeight() + 10;

    const handleNavigation = () => {
        isDescription ? navigation.reset({routes: [{name: "HomeScreen"}]}) : navigation.goBack();
    }

    return (
        <TouchableOpacity 
            style={{ zIndex:2, position: 'absolute', top: top, left :15, }} 
            onPress={handleNavigation}
        >
            <AntDesign name="arrowleft" size={30} color={cocoa ? theme.cocoa : theme.backgroundWhite} />
        </TouchableOpacity>
    )
}

export default GoBack