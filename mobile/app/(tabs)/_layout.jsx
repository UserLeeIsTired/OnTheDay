import { View, Text, Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';


import DrawerContent from '../../components/DrawerContent';
import { Tabs } from 'expo-router'
import { icons } from '../../constants'


const Drawer = createDrawerNavigator();

const TabBarIcon = ({source, color, name, focused}) => {
    return (
        <View className="items-center justify-center">
            <Image source={source} tintColor={color} className="w-6 h-6" resizeMode="contain"/>
            <Text className="text-xs" style={{color: color}}>{name}</Text>
        </View>
    )

}

const TabNavigator = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#047eb3',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: "#161622",
                height: 50
            }
        }}>
            <Tabs.Screen 
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon source={icons.home} color={color} name="Home" focused={focused}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon source={icons.dashboard} color={color} name="Dashboard" focused={focused}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: 'profile',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon source={icons.profile} color={color} name="Profile" focused={focused}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="notification"
                options={{
                    title: 'notification',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon source={icons.bell} color={color} name="Notification" focused={focused}/>
                    )
                }}
            />
        </Tabs>
    )
}



const HomeDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName='home'
        drawerContent={props => <DrawerContent {...props}/>}
        screenOptions={{
            drawerStyle: {
                backgroundColor: '#232624',
            },
            activeTintColor: '#fff',
            inactiveTintColor: '#aaa',
            
        }}
        >
            <Drawer.Screen name='Tab' component={TabNavigator} options={{headerShown: false}}/>
        </Drawer.Navigator>
    );
}

const _layout = () => {
  return (
    <HomeDrawer />
  )
}

export default _layout;