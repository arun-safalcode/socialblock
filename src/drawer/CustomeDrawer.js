import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomeDrawer = ({navigation}) => {
  return (
    <View style={{flex:1}} >
      <View
      style={{height:4,width:'100%', backgroundColor:'blue'}}
      ></View>
      <Image
      source={require('../assets/image/profile.png')}
      style={{marginTop:10, alignSelf:'center',width:80,height:80}}
      />
      <Text style={{fontSize:20, fontWeight:'700', alignSelf:'center', marginTop:20}} >User Name</Text>
    
    <View style={{marginTop:50,width:'100%'}}>
        <FlatList
        data={[
            {icon:require('../assets/image/profile-icon.png'), title:'Profile', screen:'Profile'},
            {icon:require('../assets/image/password-icon.png'), title:'Success', screen:'Success'},
            {icon:require('../assets/image/password-icon.png'), title:'Failure', screen:'Failure'},
            {icon:require('../assets/image/password-icon.png'), title:'Logout', screen:'Logout'},
        ]}
        renderItem={({item, index})=>{
            return(
                <TouchableOpacity
                style={{
                    width:'100%', 
                    flexDirection:'row', 
                    alignItems:'center',
                    height:50
                }}
                onPress={()=>{
                    navigation.closeDrawer();
                    navigation.navigate(item.screen);
                }}
                >
                <Image source={item.icon} style={{marginLeft:15, width:24,height:24}} />
                <Text 
                style={{fontSize:16, color:'#000', marginLeft:15}}
                >{item.title}</Text>
                </TouchableOpacity>
            )
        }}
        />

    </View>
    </View>
  )
}

export default CustomeDrawer