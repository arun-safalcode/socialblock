import { View, Text, BackHandler, Button, Image, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import LinearBackgroundButton from './components/LinearBackgroundButton ';

const Profile = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/banner.png')}
        style={styles.backgroundImage}
      >
        <Image source={require('../assets/image/main-logo.png')} style={{ marginTop: 50 }} />
      </ImageBackground>
      <View style={styles.mainContent}>
        <Image
        source={require('../assets/image/profile.png')}
        style={{marginTop:10, alignSelf:'center',width:100,height:100}}
        />
        <Text style={{ fontSize: 22, fontWeight: '700' }} >User Name</Text>
        <View style={{width:'100%'}}>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>Employee Id - </Text>
              <Text style={styles.cellData}>0123</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Email Id - </Text>
              <Text style={styles.cellData}>admin@admin.com</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Mobile No - </Text>
              <Text style={styles.cellData}>0123456789</Text>
            </View>
            {/* Add more rows as needed */}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <LinearBackgroundButton
            text="Logout"
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

  table: {
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize:18,
    fontWeight:'600'
  },
  cellData: {
    flex: 1,
    padding: 5,
    fontSize:18,
  },
});
export default Profile