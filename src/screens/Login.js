import { View, Text, BackHandler, Button, Image, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import LinearBackgroundButton from './components/LinearBackgroundButton ';


const Login = ({ navigation }) => {
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
            secureTextEntry={true}
            style={styles.inputStyle}
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