import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { icons } from '../constants'


const UserButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity className="flex-row justify-center items-center" onPress={onPress}>
      <Image source={icon} resizeMode='contain' className="w-4 h-4 mr-1"/>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}


const NewPost = () => {
  const {user} = useGlobalContext()
  return (
    <View className="w-[97%] border-[1px] border-black bg-white rounded-lg mt-2">
      <View className="flex-row justify-center items-center mt-2">
        <Image source={{uri: user.avatar}} className="w-12 h-12 rounded-full mr-3"/>
        <View className="border-2 border-gray-500 h-8 w-[75%] rounded-xl focus:border-green-600 flex-row items-center justify-center">
          <TextInput
              className="flex-1 font-bold text-base px-2 w-full"
              placeholder={`${user.username}, what is in your mind? `}
              placeholderTextColor="gray"
              />
          </View>
      </View>
      <View className="flex-row justify-between px-2 m-4">
        <UserButton title="Live Video" icon={icons.bookmark}/>
        <UserButton title="Photo/ Video" icon={icons.bookmark}/>
        <UserButton title="Feeling/ Activity" icon={icons.bookmark}/>
      </View>
    </View>
  )
}

export default NewPost