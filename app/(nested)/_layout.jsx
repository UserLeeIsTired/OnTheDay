import React from 'react'
import { Stack } from 'expo-router'
import NotificationProvider from '../../context/NotificationProvider'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name="create-notification" options={{headerShown: false}}/>
            <Stack.Screen name="read-notification" options={{headerShown: false}}/>
            <Stack.Screen name="user-notification" options={{headerShown: false}}/>
        </Stack>
    )
  }

export default _layout;