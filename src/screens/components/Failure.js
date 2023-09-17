import { View, Text, BackHandler, Button, Image, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import LinearBackgroundButton from './LinearBackgroundButton ';
import banner from "../../assets/image/banner.png";
import mainlogo from "../../assets/image/main-logo.png";
import faieldemoji from "../../assets/image/faield-emoji.png";

const Failure = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={banner}
        style={styles.backgroundImage}
      >
        <Image source={mainlogo} style={{ marginTop: 50 }} />
      </ImageBackground>
      <View style={styles.mainContent}>
        <Text style={{ fontSize: 28, fontWeight: '700' }} >Failure</Text>

        <Image source={faieldemoji} style={{marginTop:20}} />

        <Text style={{fontSize:24,fontWeight:'600', color:'red', marginTop:30}} >Sorry your scan failed</Text>
        <View style={{marginTop:30}}>
          <LinearBackgroundButton
              text="Go To Home"
              onPress={()=>{
                navigation.navigate('Home')
              }}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    alignItems: 'center',
  },
  mainContent: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    paddingRight: 20,
    paddingLeft: 20
  },
});

export default Failure