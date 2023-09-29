import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import actions from '../redux/actions'
import { useNavigation } from '@react-navigation/native'

const Logout = ({navigation}) => {
      useEffect(()=>{
        actions.logout();
        navigation.navigate("Login")
      },[])
  return (
    <View>
      <Text>Logout</Text>
    </View>
  )
}

export default Logout