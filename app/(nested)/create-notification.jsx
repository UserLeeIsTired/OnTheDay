import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import { router } from 'expo-router';
import { createUserNotification } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const CreateNotification = () => {
  const { user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: ''
  })
  const submit = async() => {
    if (isLoading){
      return;
    }
    if (!form.title || !form.content){
      Alert.alert('Error', 'Please fill in the content and the title');
      return;
    }
    try {
      setIsLoading(true);
      const result = await createUserNotification(user.$id, form.title, form.content);
      Alert.alert('Sucess', 'Your notification has been created!');
      router.back();
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <SafeAreaView>
      <ImageBackground source={images.mainbackground} className="h-full w-full" resizeMode='rounded-full'>
        <View className="mt-[60px] items-center">
          <View className="bg-[#142d3d] w-[95%] rounded-lg p-5">
            <View>
              <Text className="text-gray-400 font-semibold text-md my-3">Title: </Text>
              <View className="flex-row border-2 border-green-950 h-[40px] bg-black rounded-xl focus:border-green-600">
                <TextInput className="w-full text-white font-bold text-base px-2 align-text-top"
                  placeholder="What is the notifications about?"
                  placeholderTextColor="gray"
                  value={form.signature}
                  onChangeText={(e) => setForm({...form, title: e})}
                  multiline={true}
                  maxLength={100}
                />
              </View>
            </View>
            <View className="mt-5">
              <Text className="text-gray-400 font-semibold text-md my-3">Content: </Text>
              <View className="flex-row border-2 border-green-950 h-[70%] bg-black rounded-xl focus:border-green-600">
                <TextInput className="w-full h-full text-white font-bold text-base px-2"
                  placeholder="Write something..."
                  placeholderTextColor="gray"
                  value={form.signature}
                  onChangeText={(e) => setForm({...form, content: e})}
                  multiline={true}
                  maxLength={2200}
                />
              </View>
            </View>
            <View className="justify-between flex-row">
            <TouchableOpacity
                onPress={() => router.back()}
                className={`rounded-md h-[30px] justify-center content-center bg-red-500 w-[100px] my-3 ${isLoading ? 'opacity-50' : ''}`}
                >
                <Text className="font-semibold text-lg text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submit}
                className={`rounded-md h-[30px] justify-center content-center bg-green-600 w-[100px] my-3 ${isLoading ? 'opacity-50' : ''}`}
                >
                <Text className="font-semibold text-lg text-center">Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default CreateNotification