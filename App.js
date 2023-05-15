
import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  PermissionsAndroid,
  
} from 'react-native';
import { Provider } from 'react-redux';
import makeStore from './src/flow/store';
import MainNavigation from './src/Navigation/MainNavigation';
import RNPermissions from 'react-native-permissions';
import  ManageExternalStorage  from 'react-native-manage-external-storage';
const App= () => {
  const {store} = makeStore()

  useEffect(()=> {
    async function requestStoragePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to read files',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    
    async function requestAllPermissions() {
      try {
        const results = await RNPermissions.requestMultiple([
          RNPermissions.PERMISSIONS.READ_EXTERNAL_STORAGE,
          RNPermissions.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // add other permissions here
        ]);
        console.log(results);
      } catch (err) {
        console.warn(err);
      }
    }
    
    requestStoragePermission();
    requestAllPermissions();
    
    
    
    
    
    
  }, []);
  

  const [result, setResult] = useState(false);
 useEffect(() => {
    async function AskPermission() {
    await ManageExternalStorage.checkAndGrantPermission(
           err => { 
             setResult(false)
          },
          res => {
           setResult(true)
          },
        )
   }
     AskPermission()  // This function is only executed once if the user allows the permission and this package retains that permission 
  }, []);
  console.log("result: ", result)

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
