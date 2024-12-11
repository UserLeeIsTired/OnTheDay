import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'


const SystemNotice = ({ title, date, content}) => {
  const [ close, setClose ] = useState(false);
  if (close) {
    return <></>
  }
  return (
    <View className="w-full border-[1px] border-black bg-white rounded-lg mt-2 min-h-[150px]">
      <View className="flex-row justify-between mt-2">
        <View>
          <Text className="font-bold mx-6 mt-3">{title}</Text>
          <Text className="text-gray-500 font-semibold mx-6 mt-1">Posted {date}</Text>
        </View>
        <TouchableOpacity onPress={() => setClose(true)}>
          <Image source={icons.close} resizeMode='contain' className="w-6 h-6 mr-[35px] mt-[9px]"/>
        </TouchableOpacity>
      </View>
      <Text className="mx-6 mt-3 mb-3">{content}</Text>
    </View>
  )
}

export default SystemNotice