import { Redirect, router } from 'expo-router';
import { Text, View, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { images } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();
  if (!isLoading && isLoggedIn){
    return (
      <Redirect href={'/home'}/>
    )
  }

  return (
    <SafeAreaView className="bg-black">
      <ImageBackground source={images.mainbackground} className="h-full relative">
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image source={images.mainlogo} className="w-[200px] h-[200px] rounded-3xl" resizeMode='cover'/>
          <Text className="text-3xl font-light mt-5">Empower your movie</Text>
          <Text className="text-3xl font-light mb-5">journey with <Text className="text-3xl font-semibold text-[#0a244a]">OnTheDay</Text></Text>
          <CustomButton title='Continue' isLoading={false} handlePress={()=>{router.push('/login')}} 
            containerStyle={'w-full mt-5'}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
