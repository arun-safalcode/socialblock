import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
const Bottom=createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator>
        <Bottom.Screen 
        name='Home'
        component={Home}
        options={{
            headerShown:false,
            tabBarIcon:(tabinfo)=>{
                return(
                    <Image source={require('../assets/icons/home.png')} style={{width:20, height:20, tintColor:tabinfo.focused?'red':'black'}} />
                )
            }
        }}
        />
       
    </Bottom.Navigator>
  )
}

export default BottomNavigator