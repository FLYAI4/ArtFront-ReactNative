import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import UploadImage from '../../components/Main/UploadImage'
import Header from '../../components/Common/Header'

const MainScreen = () => {
    const [selectedImageUri, setSelectedImageUri] = useState('');

    return (
        <View style={{position: 'relative', width: '100%', height: '100%', backgroundColor: 'white'}}>
            <View>
                <Header nextPage='DescriptionScreen'/>
                <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white'}}>
                    <UploadImage selectedImageUri={selectedImageUri} setSelectedImageUri={setSelectedImageUri} />
                </View>
            </View>
        </View>
    )
}

export default MainScreen