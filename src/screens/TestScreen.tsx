import { View, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const TestScreen = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    return (
        <View>
        <TouchableOpacity onPress={()=>navigation.push("ScanImage")}>
            <Button title="click me -> scan" />
        </TouchableOpacity>
        </View>
    )
}

export default TestScreen