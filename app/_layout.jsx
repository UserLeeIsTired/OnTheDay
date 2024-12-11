import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import GlobalProvider from '../context/GlobalProvider'
import NotificationProvider from '../context/NotificationProvider'

const _layout = () => {
  return (
    <GlobalProvider>
      <NotificationProvider>
        <Stack>
            <Stack.Screen name="index"  options={{ headerShown: false }}/>
            <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            <Stack.Screen name="(nested)" options={{ headerShown: false }}/>
        </Stack>
      </NotificationProvider>
    </GlobalProvider>
  )
}

export default _layout;