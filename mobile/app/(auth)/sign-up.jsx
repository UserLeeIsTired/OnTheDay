import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import SecondaryButton from '../../components/SecondaryButton'
import { router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getCurrentUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const {setUser, setIsLoggedIn} = useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password || !form.confirmPassword || !form.email){
      Alert.alert('Error', 'Please fill in all the field');
      return;
    }
    if (form.password !== form.confirmPassword){
      Alert.alert('Error', 'The passwords are not the same')
      return;
    }
    setIsLoading(true);
    try{
      const result = await createUser(form.email, form.password, form.username);
      user = await getCurrentUser();
      setUser(user);
      setIsLoggedIn(true);
      router.replace('/home');
      return result;
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  } 

  return (
    <SafeAreaView>
      <ImageBackground source={images.mainbackground} className="h-full w-full justify-center" resizeMode='rounded-full'>
        <View className="w-full px-4 justify-center items-center">
          <Image source={images.mainlogohorizontal} className="w-[150px]" resizeMode='contain'/>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            placeholder='Username'
            additionalStyle="mb-4 w-full"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            placeholder='Password'
            additionalStyle="mb-4 w-full"
          />
          <FormField 
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({...form, confirmPassword: e})}
            placeholder='Re-enter your password'
            additionalStyle="mb-4 w-full"
          />
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            placeholder='Email'
            additionalStyle="w-full"
          />
          <CustomButton title="Sign Up" handlePress={submit} isLoading={isLoading} containerStyle={'w-full mt-4'}/>
        </View>
        <View className="mt-5 px-4 justify-center flex-row">
          <View className="mr-1">
            <Text className="mt-[14px] font-light text-sm text-center text-white">Have an account already?</Text>
          </View>
          <SecondaryButton title="Sign In" handlePress={() => router.push('/login')}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default SignUp;