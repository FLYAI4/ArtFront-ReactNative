import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import theme from '../../../theme'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type NextPageProps = {
    nextPage: string;
}

const NextPage = ({nextPage}:NextPageProps) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    if (nextPage !== 'DescriptionScreen') {
        return (
            <TouchableOpacity 
                style={{zIndex: 1, position: 'absolute', bottom: 20, right: 20}}
                onPress={()=>navigation.push(nextPage)}
            >
                <View style={{backgroundColor: theme.cocoa, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100}} >
                    <AntDesign name="arrowright" size={30} color={theme.backgroundWhite} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default NextPage