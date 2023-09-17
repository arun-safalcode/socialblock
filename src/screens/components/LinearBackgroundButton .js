import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearBackgroundButton  = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#1263FE', '#74A2FB', '#A9C4F9']}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 0 }}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default LinearBackgroundButton 
const styles = StyleSheet.create({
    button: {
      width: 200,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  