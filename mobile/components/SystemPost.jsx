import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'


const SystemButton = ({ handlePress }) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        className={`rounded-md min-h-[50px] justify-center bg-[#047eb3] content-center `}>
        <Text className="font-semibold text-sm text-center text-white">Get started</Text>
    </TouchableOpacity>
  )
}



const SystemPost = ({ title, content, handlePress }) => {
  const [ close, setClose ] = useState(false);
  if (close) {
    return <></>
  }
  return (
    <View className="w-full border-[1px] border-black bg-white rounded-lg mt-2">
      <View className="flex-row justify-between content-center mt-2">
        <Text className="font-bold mx-6 mt-3">{title}</Text>
        <TouchableOpacity onPress={() => setClose(true)}>
          <Image source={icons.close} resizeMode='contain' className="w-6 h-6 mr-[35px] mt-[9px]"/>
        </TouchableOpacity>
      </View>
      <Text className="mx-6 mt-3">{content}</Text>
      <View className="px-2 m-4">
        <SystemButton handlePress={handlePress} title="Get started"/>
      </View>
    </View>
  )
}

export default SystemPost