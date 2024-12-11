import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { updateSignature } from '../../lib/appwrite'
import * as DocumentPicker from 'expo-document-picker'
import { uploadUserImage } from '../../lib/appwrite'

const InputField = ({ form, setForm, setUserSignature, placeholder }) => {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!form.signature){
      Alert.alert('Error', 'Please fill in the signature first');
      return;
    }
    setIsLoading(true);
    try {
      const result = await updateSignature(form.signature);
      setUserSignature(form.signature);
      Alert.alert('Update', 'Your signature has been updated');
      return result;
    }catch (error){
      Alert.alert('Error', error.message);
    }finally{
      setForm({signature: ''});
      setIsLoading(false);
    }

  }

  return (
    <View>
      <Text className="text-gray-400 font-semibold text-md my-3">Update your personal signature: </Text>
      <View className="flex-row border-2 w-[90%] border-green-950 h-[40px] bg-black rounded-xl focus:border-green-600">
        <TextInput className="w-full text-white font-bold text-base px-2 align-text-top"
          placeholder={placeholder}
          placeholderTextColor="gray"
          value={form.signature}
          onChangeText={(e) => setForm({...form, signature: e})}
          multiline={true}
          maxLength={40}
        />
      </View>
      <View className="items-end">
        <TouchableOpacity
          onPress={submit}
          className={`rounded-md h-[30px] justify-center content-center bg-green-600 w-[100px] my-3 ${isLoading ? 'opacity-50' : ''}`}
          >
          <Text className="font-semibold text-lg text-center">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Profile = () => {
  const {user} = useGlobalContext()
  const [form, setForm] = useState({
    signature: '',
  });

  const [uploadImage, setUploadImage] = useState(null);
  const [userImage, setUserImage] = useState(user.avatar);
  const [isLoading, setIsLoading] = useState(false);

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/png', 'image/jpg']
    });
    
    if (!result.canceled){
      setUploadImage(result.assets[0]);
    }
  }

  const submitUserImage = async () => {
    if (!uploadImage || isLoading){
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadUserImage(uploadImage);
      setUserImage(uploadImage.uri);
      setUploadImage(null);
      Alert.alert('Uploaded', 'Your icon has been sucessfully updated')
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const [userSignature, setUserSignature] = useState(user.signature);
  return (
    <SafeAreaView>
      <ImageBackground source={images.mainbackground} className="h-full w-full" resizeMode='rounded-full'>
        <View className="w-full px-4 items-center mt-12">
          <View className=" bg-[#142d3d] rounded-lg mt-2 w-[98%] min-h-[100px] items-center flex-row">
            <Image source={{uri: userImage}} className="w-[60px] h-[60px] rounded-full ml-3"/>
            <View className="ml-4">
              <Text className="font-semibold text-white text-[16px]">{user.username}</Text>
              <Text className="text-gray-400" numberOfLines={1}>{userSignature}</Text>
            </View>
          </View>
          <View className="bg-[#142d3d] rounded-lg mt-2 w-[98%] items-center">
            <InputField placeholder={userSignature} form={form} setForm={setForm} setUserSignature={setUserSignature}/>
          </View>
          <View className="bg-[#142d3d] mt-2 w-[98%] rounded-lg flex">
            <Text className="text-gray-400 font-semibold text-md m-3">Update your personal icon: </Text>
              <View className="h-[120px] items-center justify-center">
                <Image source={{ uri: uploadImage ? uploadImage.uri : userImage }} className="w-[100px] h-[100px] rounded-full ml-3"/>
              </View>
              <View className="items-end">
                <View className="flex-row">
                  <TouchableOpacity onPress={openPicker}>
                    <View className="items-center rounded-md h-[30px] justify-center content-center bg-green-600 w-[100px] my-3 mr-4">
                      <Text className="font-semibold text-lg text-center">Choose file</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={submitUserImage}>
                    <View className={`items-center rounded-md h-[30px] justify-center content-center w-[100px] my-3 mr-4 ${uploadImage ? 'bg-green-600' : 'bg-slate-500' } `}>
                      <Text className="font-semibold text-lg text-center">Upload</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Profile