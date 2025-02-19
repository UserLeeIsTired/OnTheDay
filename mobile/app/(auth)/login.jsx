import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import SecondaryButton from '../../components/SecondaryButton'
import { router } from 'expo-router'
import ThirdPartyLoginButton from '../../components/ThirdPartyLoginButton'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Login = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password){
      Alert.alert('Error', 'Please enter all the field');
      return;
    }
    setIsLoading(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
      return result;
    }catch (error){
      Alert.alert('Error', error.message);
    }finally{
      setForm({...form, password: ''});
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <ImageBackground source={images.mainbackground} className="h-full w-full justify-center" resizeMode='rounded-full'>
        <View className="w-full px-4 justify-center items-center">
          <Image source={images.mainlogohorizontal} className="w-[150px]" resizeMode='contain'/>
          <Text className="text-2xl text-white font-extrabold">Welcome Back</Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            placeholder='Email'
            additionalStyle="mt-7 w-full"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            placeholder='Password'
            additionalStyle="my-4 w-full"
          />
          <CustomButton title="Login" handlePress={submit} isLoading={isLoading} containerStyle={'w-full mt-4'}/>
        </View>
        <View className="mt-5 px-4 justify-between flex-row">
          <SecondaryButton title="Forgot Password?" handlePress={() => router.push('/forgot-password')}/>
          <SecondaryButton containerStyle={'px-2'} title="Sign up" handlePress={() => router.push('/sign-up')}/>
        </View>
        <View className="justify-center content-center mt-4">
          <Text className="text-center text-white font-light text-sm mb-5">or you can login with</Text>
          <View className="justify-center flex-row">
            <ThirdPartyLoginButton source={images.googleicon} containerStyle={'mr-7'}/>
            <ThirdPartyLoginButton source={images.facebookicon} containerStyle={'mr-7'}/>
            <ThirdPartyLoginButton source={images.logo}/>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Login;