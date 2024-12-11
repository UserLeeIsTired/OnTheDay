import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyle, isLoading }) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        className={`rounded-xl min-h-[50px] justify-center bg-[#047eb3] content-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}>
        <Text className="font-semibold text-lg text-center">{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton