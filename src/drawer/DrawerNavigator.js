import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home';
import CustomeDrawer from './CustomeDrawer';
import Profile from '../screens/Profile';
import Success from '../screens/components/Success';
import Failure from '../screens/components/Failure';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props=><CustomeDrawer {...props} />} >
        <Drawer.Screen name='Home' component={Home}
        options={{
          headerShown:false
        }}
        />
        <Drawer.Screen name='Profile' component={Profile}
        options={{
          headerShown:false
        }}
        />
        <Drawer.Screen name='Success' component={Success}
        options={{
          headerShown:false
        }}
        />
        <Drawer.Screen name='Failure' component={Failure}
        options={{
          headerShown:false
        }}
        />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator