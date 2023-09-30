import { View, Text, BackHandler, Button, Image, ImageBackground, StyleSheet, TextInput, NativeModules } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import LinearBackgroundButton from './components/LinearBackgroundButton ';
const OverlayPermission = NativeModules.OverlayPermission;
const SocialMediaBlockerModule = NativeModules.SocialMediaBlockerModule;

// Lock WhatsApp
const packageNameWhatsApp = 'com.whatsapp'; // Replace with the correct package name


import { useSelector } from 'react-redux';
const Permissions = ({ navigation }) => {
    const userData = useSelector((state)=> state.auth.userData);
        // {!!userData && userData?.access_token ? navigation.navigate("Parent")
        //   : navigation.navigate("Login")
        // }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/banner.png')}
        style={styles.backgroundImage}
      >
        <Image source={require('../assets/image/main-logo.png')} style={{ marginTop: 50 }} />
      </ImageBackground>
      <View style={styles.mainContent}>
        <Text style={{ fontSize: 28, fontWeight: '700' }} >4 Problems deceted</Text>
        <Text style={{ fontSize: 12, fontWeight: '700' }} >
        In order for SocialAppBlock to work peroperly, it is necessary to grant it these permissions.
        Don't worry, we don't store or share information or data about you or your device anywhere.
        </Text>
        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Notification access"
            onPress={()=>{OverlayPermission.checkAndRequestPermission()}}
          />
          </View>
        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Display over other apps"
            onPress={()=>{OverlayPermission.requestOverlayPermission()}}

          />
          </View>
          <View style={{ marginTop: 20 }}>
           <LinearBackgroundButton
            text="Usage access"
            onPress={()=>{OverlayPermission.requestUsageAccessPermission()}}
          />
          </View>
        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Accessibility"
            onPress={()=>{OverlayPermission.requestAccessibilityPermission()}}
            style={styles.bntStyle}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Block"
            onPress={()=>{SocialMediaBlockerModule.startBlockingService()}}
            style={styles.bntStyle}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Stop"
            onPress={()=>{NativeModules.AppLock.lockApp(packageNameWhatsApp)}}
            style={styles.bntStyle}
          />
        </View>




        
          {/* <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Display pop-up window"
            onPress={()=>{OverlayPermission.requestNotificationPermission()}}
          />
          </View> */}
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
  inputViewStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 25,
  },
  inputStyle: {
    backgroundColor: '#fff',
    flex: 1,
    fontSize: 20
  },
  bntStyle:{
    marginBottom:5
  }
});

export default Permissions
