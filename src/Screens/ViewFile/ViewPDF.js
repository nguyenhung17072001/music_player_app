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
const ViewPDF=(props)=> {
    const route = useRoute();
    const languageTheme = useContext(Context);
    //console.log(languageTheme);
    const ref = useRef();
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} barStyle={"dark-content"}/>
            <Header name="View PDF" />
            <Pdf
                    source={{uri:`file:///${route?.params?.path}`}}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
            
           
        </View>
    )
}


export default ViewPDF;