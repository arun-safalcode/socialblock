import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const Logout = ({navigation}) => {
    useEffect(()=>{
        navigation.navigate('Login');
    })
  return (
    <View>
      <Text>Logout</Text>
    </View>
  )
}

export default Logout