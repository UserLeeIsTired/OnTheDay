import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

const EmptyNotification = () => {
  return (
    <View className="w-[95%] items-center text-center">
      <Image source={images.camera}/>
      <View className="w-[70%]">
        <Text className="text-xl font-semibold text-white text-center">Enjoy a moment of tranquility as there are currently no notifications to disrupt your peace, allowing you to relish in serene silence.</Text>
      </View>
    </View>
  )
}

export default EmptyNotification