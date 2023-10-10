import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import logo from '../assets/image//logo.png'
import { getUserData } from '../utils/utils';
import { useSelector } from 'react-redux';

const Splash = ({navigation}) => {
  const userData = useSelector((state)=> state.auth.userData)

  useEffect(()=>{
    setTimeout(()=>{

      navigation.navigate("Permissions");
    },2000)
  },[])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'#fff'}} >
      <Image  source={logo} />
      <Text style={{fontSize:28, fontWeight:'700',marginTop:20,marginBottom:20, color:"black"}}  >Social App Blocker</Text>
      <Text style={{color:"black"}} >Powered By Saavira</Text>
    </View>
  )
}

export default Splash