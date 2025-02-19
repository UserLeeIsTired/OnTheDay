import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { logout } from '../lib/appwrite';
import { router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const SignOut = async () => {
  try {
    await logout().then(() => {
      router.replace('/login');
    });
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

const Content = ({ props, avatar, username, email }) => {
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="p-6 flex-row">
          <Image source={{ uri: avatar }} className="w-12 h-12 rounded-full" />
          <View className="ml-4">
            <Text className="text-xl font-semibold text-white">{username}</Text>
            <Text className="text-[12px] text-gray-200">{email}</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-white">
          <DrawerItem
            label="Logout"
            onPress={SignOut}
          />
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const DrawerContent = ({ props }) => {
  const [userData, setUserData] = useState({
    avatar: '',
    username: 'Loading',
    email: 'Loading',
  });

  const { user } = useGlobalContext();

  useEffect(() => {
    if (user) {
      setUserData({
        avatar: user.avatar || '',
        username: user.username || 'No username',
        email: user.email || 'No email',
      });
    }
  }, [user]);

  return (
    <Content
      props={props}
      avatar={userData.avatar}
      username={userData.username}
      email={userData.email}
    />
  );
};

export default DrawerContent;