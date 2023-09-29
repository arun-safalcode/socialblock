import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import LinearBackgroundButton from '../screens/components/LinearBackgroundButton '
import { useSelector } from 'react-redux'

const CustomeDrawer = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);

  const onLogoutAlert = () => {
    Alert.alert(
      'Logout',
      'Are you sure, you want to logout?',
      [{ text: 'yes', onPress: logout }, { text: 'No', }],
      { cancelable: true }
    )
  }
  const logout = () => {
    navigation.navigate("Logout");
  }

  return (
    <View style={{ flex: 1 }} >
      <View
        style={{ height: 4, width: '100%', backgroundColor: 'blue' }}
      ></View>
      <Image
        source={require('../assets/image/profile.png')}
        style={{ marginTop: 10, alignSelf: 'center', width: 80, height: 80 }}
      />
      <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'center', marginTop: 20 }} >{userData.user.name}</Text>

      <View style={{ marginTop: 50, width: '100%' }}>
        <FlatList
          data={[
            { icon: require('../assets/image/profile-icon.png'), title: 'Profile', screen: 'Profile' },
          ]}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50
                }}
                onPress={() => {
                  navigation.closeDrawer();
                  navigation.navigate(item.screen);
                }}
              >
                <Image source={item.icon} style={{ marginLeft: 15, width: 24, height: 24 }} />
                <Text
                  style={{ fontSize: 16, color: '#000', marginLeft: 15 }}
                >{item.title}</Text>
              </TouchableOpacity>
            )
          }}
        />
        <View style={{ marginTop: 50 }}>
          <LinearBackgroundButton
            text="Logout"
            onPress={onLogoutAlert}

          />
        </View>


      </View>
    </View>
  )
}

export default CustomeDrawer