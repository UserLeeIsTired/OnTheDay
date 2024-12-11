import { View,  TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { icons } from '../constants'

const SearchBox = ({ onPress }) => {
  return (
    <View className="border-2 border-gray-600 h-8 w-[75%] rounded-xl focus:border-green-600 flex-row items-center justify-center">
        <TextInput
            className="flex-1 text-white font-bold text-base px-2 w-full"
            placeholder='Ask Filmy...'
            placeholderTextColor="gray"
            />
        <TouchableOpacity className="pr-2" onPress={onPress}>
            <Image source={icons.search} resizeMode='contain' className="h-5 w-5"/>
        </TouchableOpacity>
    </View>
  )
}

export default SearchBox