import { View, Text, TouchableOpacity , Image, BackHandler, ImageBackground, StyleSheet, ScrollView, NativeModules } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native';
import LinearBackgroundButton from './components/LinearBackgroundButton ';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {OverlayPermission } = NativeModules;
import actions from '../redux/actions';

const Home = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [attendanceHistory,setAttendanceHistory] = useState([]);

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

  const getAttendanceHistory = async ()=>{
    const res = await actions.attandHistory();
    setAttendanceHistory(res.data);
  }


  useEffect(() => {
    getAttendanceHistory();
  },[isFocused]);

  // Sort the data by the "created_at" timestamp in descending order
  const sortedData = attendanceHistory.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  // Get the latest entry (the first entry in the sorted array)
  const lastEntry = sortedData[0];
  const startService = async ()=>{
        const applistResponse = await actions.applist();
        const appData = applistResponse.data;
        const packageNames  = appData.map(item => item.app_id_for_android);
        OverlayPermission.startBlockingService(packageNames);
  }
  const stopService = () =>{
    OverlayPermission.stopBlockingService();
  } 
  lastEntry?lastEntry.in_out_status==1?startService():stopService():stopService()
  return (
    <View style={{ flex: 1 }} >
      <View style={{
        width: "100%",
        height: 60,
        flexDirection: 'row',
        elevation: 3,
        backgroundColor: '#fff',
        alignItems: 'center'
      }} >
        <Text
          style={{ fontSize: 18, fontWeight: '600', marginLeft: 15 }}
        >Your dashboard</Text>
      </View>
      <ScrollView>
        <ImageBackground
          source={require('../assets/image/banner.png')}
          style={styles.backgroundImage}
        >
          <Image source={require('../assets/image/main-logo.png')} style={{ marginTop: 50 }} />
        </ImageBackground>
        <View style={styles.mainContent}>

          <Text style={{ fontSize: 28, fontWeight: '700' }} >Activity</Text>
          <Image
            source={require('../assets/image/qr.png')}
            style={{ marginTop: 10, alignSelf: 'center', width: 100, height: 100 }}

          />
          <View style={{ marginTop: 20 }}>
            <LinearBackgroundButton
              text={lastEntry?lastEntry.in_out_status==1?"Scan For Exit":"Scan For In":'Scan Now'}
              onPress={() => {
                navigation.navigate('Scanner')
              }}
            />
          
          </View>

          <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: '600' }}>Last Scan</Text>
            <View
              style={{ height: 2, width: '100%', backgroundColor: '#1263FE' }}
            ></View>

            <View style={styles.table}>
              <View style={styles.header}>
                <Text style={styles.cellHeader}>Employee Id</Text>
                <Text style={styles.cellHeader}>Time</Text>
                <Text style={styles.cellHeader}>Exit/In</Text>
              </View>
              {attendanceHistory.map((item, index) => (
                <View style={styles.row} key={index} >
                <Text style={styles.cell}>{item.employee_id}</Text>
                <Text style={styles.cell}>{item.in_out_status==1?item.start_time:item.end_time}</Text>
                <Text style={styles.cell}>{item.in_out_status==1?"In":"Exit"}</Text>
              </View>
              ))}
              
            </View>

          </View>

        </View>
      </ScrollView>




    </View>
  )
}

export default Home

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
    borderColor: '#F1F0F0',
    borderWidth: 1,
    borderRadius: 5,
    marginTop:20,
    marginBottom:20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#F1F0F0'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#fff'
  },
  cellHeader: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderColor: '#B3B3B3',
    borderWidth: 1,
    fontSize:18,
    color:'#000'
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderColor: '#B3B3B3',
    borderWidth: 1,
    fontSize:18,
  },

});