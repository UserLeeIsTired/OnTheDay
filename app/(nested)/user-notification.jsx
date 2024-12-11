import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNotificationContext } from '../../context/NotificationProvider'
import { router } from 'expo-router';

const UserNotification = ({ senderId, title, content }) => {
  const {  setSenderId, setTitle, setContent } = useNotificationContext();
  const viewNotification = () => {
    setSenderId(senderId);
    setTitle(title);
    setContent(content);
    router.push('/read-notification')
  }
  return (
    <View className="w-[90%] mb-2">
      <TouchableOpacity onPress={viewNotification}>
        <View className="bg-[#142d3d] h-[90px] rounded-md justify-center">
          <View className="ml-3">
            <Text className="text-white text-[28px] font-semibold">{title.length >= 20 ? title.substring(0, 20) + '...' : title}</Text>
            <Text className="text-white text-[18px]">{content.length >= 30 ? content.substring(0, 30) + '...' : content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default UserNotification