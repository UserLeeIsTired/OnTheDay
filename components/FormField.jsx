import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, additionalStyle }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
    <View className={`space-y-2 ${additionalStyle}`}>
        <Text className="text-base text-gray-100 font-medium">{title}</Text>
        <View className="border-2 border-green-950 h-16 bg-black rounded-xl focus:border-green-600 flex-row items-center justify-center">
            <TextInput 
                className="flex-1 text-white font-bold text-base px-2"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="gray"
                onChangeText={handleChangeText}
                maxLength={(title === 'Password' || title === "Confirm Password") ? 50: 200 }
                secureTextEntry={(title === 'Password' || title === "Confirm Password") && !showPassword ? true : false}
            />
            {
                title === 'Password' || title === "Confirm Password"? 
                <TouchableOpacity className="px-2" onPress={() => setShowPassword(!showPassword)}>
                    <Image source={showPassword ? icons.eyeHide : icons.eye} className="w-7 h-7" resizeMode='contain'/>
                </TouchableOpacity>
                 : <></>
            }
        </View>
    </View>
  )
}

export default FormField