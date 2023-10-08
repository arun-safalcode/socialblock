import { View, Text, BackHandler, Button, Image, ImageBackground, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import LinearBackgroundButton from './components/LinearBackgroundButton ';
import validation from '../utils/validation';
import { showError, showSuccess } from '../utils/helperFunction';
import actions from '../redux/actions';
import { useSelector } from 'react-redux';

const Login = ({ navigation }) => {
  const userData = useSelector((state)=> state.auth.userData);
   {!!userData && userData?.access_token ? navigation.navigate("Parent")
          : navigation.navigate("Login")
        }
  // BackHandler function in home page 
  const isFocused = useIsFocused();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    });
    return () => {
      backHandler.remove();
    };
  }, [isFocused]);



  const [state, setState]= useState({
    isLoading:false,
    email:'',
    password:'',
    isSecure:true
  });
  const {isLoading, email, password, isSecure} = state
  const updateState = (data)=> setState(()=>({...state, ...data}));

  const isValidData = ()=>{
    const error = validation({
      email,
      password
    })
    if(error){
      showError(error)
      return false
    }
    return true
  }

  //On Login
  const onLogin = async()=>{
    const checkValid = isValidData()
    if(checkValid){
      updateState({isLoading:true})
      try{
        const res = await actions.login({
          email,
          password
        })
        showSuccess(email+" Successfully Logged")
        navigation.navigate("Parent")
        updateState({isLoading:false})
      }catch(error){
        console.log("============",error)
        showError(error.message)
        updateState({isLoading:false})
      }
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
      <View style={styles.loginForm}>
        <Text style={{ fontSize: 28, fontWeight: '700' }} >Login</Text>
        <View style={styles.inputViewStyle}>
          <TextInput
            placeholder='Email id'
            style={styles.inputStyle}
            onChangeText={(email)=>updateState({email})}
          />
          <Image
            source={require('../assets/image/profile-icon.png')}
            style={{
              width: 30,
              height: 30,
              marginRight: 5
            }}
          />
        </View>
        <View style={styles.inputViewStyle} >
          <TextInput
            placeholder='Password'
            secureTextEntry={isSecure}
            style={styles.inputStyle}
            onChangeText={(password)=>updateState({password})}

          />
          <Image
            source={require('../assets/image/password-icon.png')}
            style={{
              width: 30,
              height: 30,
              marginRight: 5
            }}
          />
        </View>
        <Text style={{
          alignSelf: 'flex-start',
          fontSize: 18,
          fontWeight: '700'
        }}
          onPress={() => {
            navigation.navigate('Forgot Password')
          }}
        >Forget Password</Text>
        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Login"
            onPress={onLogin}
            isLoading={isLoading}
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
  loginForm: {
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
  }
});

export default Login