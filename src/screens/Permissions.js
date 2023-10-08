import { View, Text, BackHandler, Button,Modal , Image, ImageBackground, StyleSheet, TextInput, NativeModules } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
const {OverlayPermission } = NativeModules;

import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import LinearBackgroundButton from './components/LinearBackgroundButton ';
const Permissions = ({ navigation }) => {
    const userData = useSelector((state)=> state.auth.userData);
    const [isGranted, setIsGranted] = useState(false);
    const [isGranted2, setIsGranted2] = useState(false);

        const CheckUsageaccess = ()=>{
          OverlayPermission.requestUsageAccessPermission(permissionGranted => {
            if (permissionGranted) {
              // Permission is granted
              console.log('Permission granted');
              setIsGranted(true)
            } else {
              // Permission is not granted
              console.log('Permission not granted');
              setIsGranted(false)
            }
          });
        }
        const CheckOverlayPermission = ()=>{
          OverlayPermission.requestOverlayPermission(permissionGranted => {
            if (permissionGranted) {
              // Permission is granted
              console.log('Permission granted');
              setIsGranted2(true)
            } else {
              // Permission is not granted
              console.log('Permission not granted');
              setIsGranted2(false)
            }
          });
        }
        useEffect(()=>{
          CheckUsageaccess();
          CheckOverlayPermission();
          if(isGranted && isGranted2){
            navigation.navigate("Login");
          }
        },[isGranted,isGranted2])


  return (
    <ScrollView>

    
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
            <Text>Display over other apps</Text>
            <Text>Since Android 10, this permission is requried to block apps and websites</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>
              Usage Access 
            </Text>
            <Text>
              This permission required to block apps and websites
            </Text>
          <LinearBackgroundButton
            text={isGranted && isGranted2?"All Permission is Granted":'Check Permission Status'}
            onPress={()=>{CheckOverlayPermission();CheckUsageaccess();}}
          />
          </View>
        {/* <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Accessibility"
            onPress={()=>{OverlayPermission.requestAccessibilityPermission()}}
            style={styles.bntStyle}
          />
        </View> */}
        
        {/* <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Block"
            onPress={()=>{OverlayPermission.startBlockingService()}}
            style={styles.bntStyle}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Stop"
            onPress={()=>{OverlayPermission.stopBlockingService()}}
            style={styles.bntStyle}
          />
        </View> */}
      </View>
    </View>
    </ScrollView>
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
