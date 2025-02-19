import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView, ImageBackground, Image } from 'react-native'
import React from 'react'
import { icons, images } from '../../constants';
import CustomButton from '../../components/CustomButton'
import SearchBox from '../../components/SearchBox';
import { ScrollView } from 'react-native-gesture-handler';
import SummaryChart from '../../components/SummaryChart';
const dashboard = () => {
  return (
    <SafeAreaView className="bg-black">
      <ScrollView>
        <ImageBackground source={images.mainbackground} className="h-full relative">
          <View className="mt-12 pr-2 rounded-xl">
            <View className="flex-row justify-center items-center">
              <Image source={images.transparentlogo} className='rounded-full'/>
              <SearchBox onPress={() => {}}/>
            </View>
          </View>
          <View className="w-full items-center min-h-[85vh] px-4">
            <SummaryChart/>
            <View className="bg-[#142d3d] rounded-lg mt-2 w-[95%] min-h-[200px] items-center justify-center">
              <Text className="text-white text-xl font-semibold">Start working on your projects today</Text>
              <TouchableOpacity
                  onPress={() => {}}
                  className={`rounded-md min-h-[50px] w-[90%] mt-3 justify-center bg-[#047eb3] content-center `}>
                  <Text className="font-semibold text-sm text-center text-white">Get started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}

export default dashboard