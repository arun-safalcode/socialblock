import { View, Text, BackHandler, Button,Modal , Image, ImageBackground, StyleSheet, TextInput, NativeModules } from 'react-native'
import React, { useState,useEffect } from 'react'
import DeviceInfo from 'react-native-device-info';

import { useIsFocused } from '@react-navigation/native';
const {OverlayPermission } = NativeModules;

import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import LinearBackgroundButton from './components/LinearBackgroundButton ';
const Permissions = ({ navigation }) => {
    const userData = useSelector((state)=> state.auth.userData);
    const [isGranted, setIsGranted] = useState(false);
    const [isGranted2, setIsGranted2] = useState(false);
    const [isGranted3, setIsGranted3] = useState(false);

    const [deviceStatus, setDeviceStatus] = useState(false);

    const isXiaomiDevice = async () => {
      try {
        const brand = await DeviceInfo.getBrand();
        return brand.toLowerCase() === 'xiaomi' || brand.toLowerCase() === 'redmi';
      } catch (error) {
        // Handle the Promise rejection here
        console.error('Error while checking device brand:', error);
        return false; // Assuming non-Xiaomi as a fallback
      }
    };
    
    // Example usage
    const CheckMI = ()=>{
      isXiaomiDevice().then((result) => {
        if (result) {
          setDeviceStatus(true)
        } else {
          setDeviceStatus(false)
        }
      });
    }
   
    

        const CheckUsageaccess = ()=>{
          OverlayPermission.requestUsageAccessPermission(permissionGranted => {
            if (permissionGranted) {
              // Permission is granted
              console.log('UsageAccess Permission granted');
              setIsGranted(true)
            } else {
              // Permission is not granted
              console.log('UsageAccess Permission not granted');
              setIsGranted(false)
            }
          });
        }
        const CheckOverlayPermission = ()=>{
          OverlayPermission.requestOverlayPermission(permissionGranted => {
            if (permissionGranted) {
              // Permission is granted
              console.log('Overlay Permission granted');
              setIsGranted2(true)
            } else {
              // Permission is not granted
              console.log('Overlay Permission not granted');
              setIsGranted2(false)
            }
          });
        }

        const CheckAccessiblity = () =>{
          OverlayPermission.isMyAccessibilityServiceEnabled((isEnabled) => {
            if (isEnabled) {
              setIsGranted3(true)
              // alert("Accessibility Permission Granted")
            } else {
              setIsGranted3(false)
              alert("Accessibility Permission Not Granted. Please Click Allow Permission")
            }
          });
        }

        useEffect(()=>{
          // CheckUsageaccess();
          // CheckOverlayPermission();
          // CheckAccessiblity()
          if(isGranted && isGranted2 && isGranted3){
            navigation.navigate("Login");
          }
        },[isGranted,isGranted2,isGranted3])

        useEffect(()=>{
          CheckMI();
        },[])

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
        <Text style={{ fontSize: 16, color:"black" }} >
        In order for Social Blocker to work peroperly, it is necessary to grant it these permissions.
        Don't worry, we don't store or share information or data about you or your device anywhere.
        </Text>
     
          <View style={{ marginTop: 20 }}>
            <Text style={{fontSize: 16, fontWeight: '600',color:"black"}} >Display over other apps
            {deviceStatus=== true?" and Display pop-up windows while running in the background also need to allow":""}</Text>
            <Text style={{color:"black"}} >Since Android 10, this permission is requried apps and websites</Text>
            <Text style={{marginTop:10}}>
              <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>Usage Access</Text>
              <Text style={{ color: "black", fontSize: 16 }}>Permission Requried</Text>
            </Text>

          </View>
          <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text={isGranted && isGranted2 &&isGranted3?"Granted":'Check Permission'}
            onPress={()=>{CheckOverlayPermission();CheckUsageaccess();CheckAccessiblity();}}
          />
          </View>
          <View > 
            <Text style={{marginTop:10}}>
              <Text style={{ color: "black", fontSize: 18 }}>1. Find Download Apps or Services and </Text>
              <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>Social Blocker</Text>
            </Text>
            <Text style={{marginTop:10}}>
              <Text style={{ color: "black", fontSize: 18 }}>2. Tap the switch to </Text>
              <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>turn ON</Text>
            </Text>
            <Text style={{marginTop:10}}>
              <Text style={{ color: "black", fontSize: 18 }}>3. Tap </Text>
              <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>Allow</Text>
              <Text style={{ color: "black", fontSize: 18 }}>to confirm </Text>
            </Text>
            
          </View>
       
        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text={isGranted3?"Accessibility Granted":'Allow Permission'}
            onPress={()=>{OverlayPermission.requestAccessibilityPermission()}}
            style={styles.bntStyle}
          />
        </View>
        
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
  },
  TextSize18:{
    fontSize:18
  }
});

export default Permissions
