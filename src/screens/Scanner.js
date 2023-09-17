import { View, Text, BackHandler, Button, Image, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import LinearBackgroundButton from './components/LinearBackgroundButton ';

const Scanner = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/banner.png')}
        style={styles.backgroundImage}
      >
        <Image source={require('../assets/image/main-logo.png')} style={{ marginTop: 50 }} />
      </ImageBackground>
      <View style={styles.mainContent}>
        <Text style={{ fontSize: 28, fontWeight: '700' }} >Scanner</Text>
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

export default Scanner