import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import logo from '../assets/image//logo.png'

const Splash = ({navigation}) => {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Parent')
    },2000)
  },[])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'#fff'}} >
      <Image  source={logo} />
      <Text style={{fontSize:28, fontWeight:'700',marginTop:20,marginBottom:20}} >Social App Blocker</Text>
      <Text>Powered By Maheshwari Medical</Text>
    </View>
  )
}

export default Splash