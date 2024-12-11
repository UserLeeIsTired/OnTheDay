import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import { router } from 'expo-router';
import { useNotificationContext } from '../../context/NotificationProvider';
import { getUser } from '../../lib/appwrite';

const ReadNotification = () => {
  const {senderId, title, content} = useNotificationContext();
  const [sender, setSender] = useState(null);
  getUser(senderId).then((result) =>
    setSender(result)
  ).catch((error) => {
    console.log(error);
  });
  return (
    <SafeAreaView>
      <ImageBackground source={images.mainbackground} className="h-full w-full" resizeMode='rounded-full'>
        <View className="mt-[60px] items-center">
          <View className="bg-[#142d3d] w-[95%] rounded-lg p-5">
            <View className="flex-row my-3">
              <Image source={{uri: sender ? sender.avatar : ''}} className="w-[60px] h-[60px] rounded-full ml-2"/>
              <Text className="font-semibold text-white text-[16px] ml-5 mt-5">{sender ? sender.username : "" }</Text>
            </View>
            <View>
              <Text className="text-gray-400 font-semibold text-md mt-2">Title: <Text className="text-white">{title}</Text></Text>
            </View>
            <View className="mt-1 min-h-[72%]">
              <Text className="text-gray-400 font-semibold text-md my-3">Content: </Text>
              <Text className="text-white">{content}</Text>
            </View>
            <View className="items-center">
            <TouchableOpacity
                onPress={() => router.back()}
                className={`rounded-md h-[30px] justify-center content-center bg-green-500 w-[100px] my-3`}>
                <Text className="font-semibold text-lg text-center">Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
  }

export default ReadNotification