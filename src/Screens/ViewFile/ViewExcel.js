import React, {useContext, useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, Dimensions, Platform, PermissionsAndroid, FlatList } from "react-native";
import theme from "../../Core/theme";
const {font, icons, colors, images, strings}=theme;
import styles from "./ViewFileStyles";
import Header from "../../components/Header";
import Context from "../../Core/Context";
import ModalForm from "../../components/ModalForm";
const {height, width} = Dimensions.get('window');
import moment from 'moment'
import RNFS from 'react-native-fs';
import RNFetchBlob from "react-native-fetch-blob";
import DocumentPicker from "react-native-document-picker"
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import Pdf from 'react-native-pdf';
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from 'react-native-webview';
import FileViewer from "react-native-file-viewer";
const ViewExcel=(props)=> {
    const route = useRoute();
    const languageTheme = useContext(Context);
    //console.log(languageTheme);
    const ref = useRef();
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} barStyle={"dark-content"}/>
            <Header name="View Excel" />
            <WebView
                
                source={{ uri: `http://phongkhamphuongmai.com` }}
                style={{ flex: 1, width: width, height: height }}

                startInLoadingState={true}
                limitsNavigationsToAppBoundDomains={true}
                autoManageStatusBarEnabled= {true}
                onLoadStart={(syntheticEvent) => {
                    // update component to be aware of loading status
                    const { nativeEvent } = syntheticEvent;
                    
                    console.log('Loading bắt đầu: ', nativeEvent)
                    
                }}
                onLoad={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    
                    console.log('Loading xong: ', nativeEvent);
                    
                }}
            />
            
           
        </View>
    )
}


export default ViewExcel;