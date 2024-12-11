import { View, Text } from 'react-native'
import { SafeAreaView, ImageBackground, Image } from 'react-native'
import React from 'react'
import { icons, images } from '../../constants';
import SearchBox from '../../components/SearchBox';
import { ScrollView } from 'react-native-gesture-handler';
import SystemPost from '../../components/SystemPost';
import SystemNotice from '../../components/SystemNotice';
import getData from '../../lib/extract';
import { getSystemNotice } from '../../lib/appwrite';

const Home = () => {
  const { data: systemNotice } =  getData(getSystemNotice);
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
          <Image source={images.stockphoto} className="w-full h-[200px]"/>
          <View className="w-full items-center min-h-[85vh]">
            <SystemPost title="Welcome to Your Management Dashboard" content="Stay organized and manage your tasks efficiently with our app. Get insights, track progress, and stay on top of your projects."  handlePress={() => {}}/>
            {
              systemNotice.map((item) => (
                <SystemNotice 
                  key={item.$id}
                  title={item.title}
                  date={item.date}
                  content={item.content}
                />
              ))
            }
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;