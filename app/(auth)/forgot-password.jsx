import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import SecondaryButton from '../../components/SecondaryButton'
import { router } from 'expo-router'
import { sendRecoveryEmail } from '../../lib/appwrite'

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!form.email){
      Alert.alert('Error', 'Please enter the email field');
      return;
    }
    setIsLoading(true);
    try {
      const result = await sendRecoveryEmail(form.email);
      if (result){
        router.replace('/confirmation');
      }
      return result;
    }catch (error){
      Alert.alert('Error', error.message);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <ImageBackground source={images.mainbackground} className="h-full w-full justify-center" resizeMode='rounded-full'>
        <View className="w-full px-4 justify-center items-center">
          <Image source={images.mainlogohorizontal} className="w-[150px]" resizeMode='contain'/>
          <Text className="text-3xl text-white font-extrabold">Forgot Password?</Text>
          <Text className="text-[14px] text-white mt-12">Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            placeholder='Email'
            additionalStyle="mt-7 w-full"
          />
          <CustomButton title="Send" handlePress={submit} isLoading={isLoading} containerStyle={'w-full mt-4'}/>
        </View>
        <View className="mt-5 px-4 justify-center flex-row">
          <SecondaryButton title="Back to main login page" handlePress={() => router.push('/login')}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default ForgotPassword