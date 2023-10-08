import {
  View, Text, Image, ImageBackground, StyleSheet,NativeModules
} from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useSelector } from 'react-redux'
import { showError, showSuccess } from '../utils/helperFunction';
import actions from '../redux/actions'; 
const {OverlayPermission } = NativeModules;
const Scanner = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [state, setState]= useState({
    isLoading:false,
    token:'',
    isSecure:true,
  });
  const {isLoading, token, isSecure, in_outStatus} = state
  const updateState = (data)=> setState(()=>({...state, ...data}));
  const [lockedList, setLockList] = useState([]);

  //Scan qr code and check user is authenticated or not
  const onSuccess = async (e)=>{
    try{
      const res = await actions.scanner({
        qr_code_token:e.data
      })
     if(userData.user.location_id === res.data.location_id){
      showSuccess("User successfully verified.")
      storeAttendance(res.data.id);
     }else{
      showError("User location does not matched")
      alert("User location does not matched")
     }
      
    }catch(error){
      showError("Something went wrong  qr scan")
      alert("Someting went wrong qr scan")
    }
  }
  //If user is authenticated with the location then start attendacne and blocking apps
  const storeAttendance = async (qr_id)=>{
    try{
      const res = await actions.attendance({
        qr_id:qr_id,
      })
        if(res.in_out_status === 1){
          showSuccess(res.message)
          const applistResponse = await actions.applist();
          const appData = applistResponse.data;
          const packageNames  = appData.map(item => item.app_id_for_android);
          OverlayPermission.startBlockingService(packageNames);
        }else{
          showError(res.message)
          OverlayPermission.stopBlockingService();
        }
        navigation.navigate("Parent");
    }catch(error){
      showError("Something went wrong")
      alert("Someting went wrong qr scan")
      navigation.navigate("Parent");
    }
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
            flashMode={RNCamera.Constants.FlashMode.auto}
            showMarker={true}
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