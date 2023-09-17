import {
  View, Text, BackHandler, Button, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity,
  Linking
} from 'react-native'
import React, { useEffect } from 'react'
import LinearBackgroundButton from './components/LinearBackgroundButton ';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
const Scanner = ({ navigation }) => {
  const onSuccess = (e)=>{
   alert(e.data)
   navigation.navigate('Home');
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/banner.png')}
        style={styles.backgroundImage}
      >
        <Image source={require('../assets/image/main-logo.png')} style={{ marginTop: 50 }} />
      </ImageBackground>
          <Text style={{fontSize:24,fontWeight:'700',padding:20,marginBottom:40,color:'#000'}} >Scanner</Text>
          <QRCodeScanner
            onRead={(e)=>{onSuccess(e)}}
            flashMode={RNCamera.Constants.FlashMode.torch}
            showMarker={true}
            reactivate={true}
            reactivateTimeout={500}
          />        
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
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
});

export default Scanner