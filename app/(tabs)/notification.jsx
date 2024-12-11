import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView, ImageBackground, Image } from 'react-native'
import React from 'react'
import { icons, images } from '../../constants';
import SearchBox from '../../components/SearchBox';
import { ScrollView } from 'react-native-gesture-handler';
import getData from '../../lib/extract';
import { getAllNotifications } from '../../lib/appwrite';
import EmptyNotification from '../../components/EmptyNotification';
import { router } from 'expo-router';
import UserNotification from '../(nested)/user-notification';

const CreateNotificationButton = () => {
  return (
    <TouchableOpacity
        onPress={() => router.push('create-notification')}
        className="rounded-md w-[40%] min-h-[50px] justify-center bg-green-500 content-center ml-6">
        <Text className="font-semibold text-md text-center">+ Create Notification</Text>
    </TouchableOpacity>
  )
}

const Notification = () => {
  const { data: notifications } =  getData(getAllNotifications);
  
  return (
    <SafeAreaView className="bg-black">
      <ScrollView>
        <ImageBackground source={images.mainbackground} className="h-full">
          <View className="mt-12 pr-2 rounded-xl">
            <View className="flex-row justify-center items-center">
              <Image source={images.transparentlogo} className='rounded-full'/>
              <SearchBox onPress={() => {}}/>
            </View>
          </View>
          <CreateNotificationButton/>
          <View className="w-full items-center min-h-[85vh] mt-5 ">
            {
              notifications.length === 0 ? <EmptyNotification/> : notifications.map(
                (item) => <UserNotification 
                            key={item.$id}
                            senderId={item.senderId}
                            title={item.title}
                            content={item.content}
                          />)
            }
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notification