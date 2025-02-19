import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import SecondaryButton from '../../components/SecondaryButton'
import { router } from 'expo-router'
import { sendRecoveryEmail } from '../../lib/appwrite'

const Confirmation = () => {
  return (
    <SafeAreaView>
      <ImageBackground source={images.mainbackground} className="h-full w-full justify-center" resizeMode='rounded-full'>
        <View className="w-full px-4 justify-center items-center">
          <Image source={images.mainlogohorizontal} className="w-[150px]" resizeMode='contain'/>
          <Text className="text-3xl text-white font-extrabold">Email sent!</Text>
          <Text className="text-[14px] text-white mt-12">Please check your email</Text>
        </View>
        <View className="mt-5 px-4 justify-center flex-row">
          <SecondaryButton title="Back to main login page" handlePress={() => router.push('/login')}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Confirmation