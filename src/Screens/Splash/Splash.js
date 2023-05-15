import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image, StatusBar, Dimensions } from 'react-native';
import styles from './SplashStyle'
import theme from '../../Core/theme';
const { strings, images, colors } = theme;

import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import RNFetchBlob from "react-native-fetch-blob";
import DocumentPicker from "react-native-document-picker"
import pLimit from "p-limit"
const {height, width} = Dimensions.get('window')
import * as Progress from 'react-native-progress';



const Splash = ({navigation}) => {
    
    const [files, setFiles] = useState([]);
    const findFiles = async (dirPath) => {
      try {


        
        const files = await RNFS.readDir(dirPath);
        


        const data = [];
        for (const file of files) {
          let re = /(?:\.([^.]+))?$/;
          let extension = re.exec(file.name)[1];
          if (file.isDirectory()) {
            
            data.push(...(await findFiles(file.path)));
          } else if(
            extension=="pdf"
            || extension == "doc" 
            || extension== "docx"
            || extension == "xlsx" 
            || extension== "xls" 
            || extension== "xlsm" 
            || extension=="csv"
            || extension == "pptx" 
            || extension== "ppt" 
            || extension== "pptm"
            || extension == "txt"
            || extension == "jpg" 
            || extension== "png" 
            || extension== "jpge" 
            || extension=="gif" 
            || extension == "tiff" 
            || extension=="bmp"
            || extension=="svg"
            ) {
            
            data.push({
              name: file.name,
              path: file.path,
              mtime: file.mtime,
              size: file.size,
            });
          }
        }
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    };

    


    /* RNFS.readDir(dirPath).then((data)=> {
      let re = /(?:\.([^.]+))?$/;
      console.log("data: ", data.filter((file)=> {
        let extension = re.exec(file.name)[1];
        return extension=="pdf"
      }))

    }) */
    
    
    
    
    
    useEffect(()=>{
        clearTimeout(timeout)
        const timeout = setTimeout(() => {
            findFiles("/storage/emulated/0")
            //findFiles(RNFS.getAllExternalFilesDirs())
                .then((data)=> {
                    setFiles(data);
                    
                    
                    AsyncStorage.setItem("data", JSON.stringify([].concat(...data)));
                }).then(()=> {
                    navigation.replace('HomeNavigation')
                }).catch((err)=> {
                    console.log("err khi tải dữ liệu: ", err)
                    alert("Lỗi khi tải dữ liệu lên")
                })
            
        }, 500);
    },[]) 
    
    return(
        <View style={{...styles.container}}>
            <StatusBar backgroundColor={colors.mainBackgroundColor} barStyle='light-content' />
            
            {/* <Image
                source={images.logoSplash}
                resizeMode='contain'
                style={{
                    width: width * 0.5,
                    height: height * 0.12
                }}
            /> */}
            <View />
            
            <Text style={styles.appName}>Reader All Files</Text> 
            <Text style={styles.brandName}>{strings.brand_name}</Text> 
            <View style={{marginBottom: height*0.1}}>
                <Progress.Bar 
                    indeterminate={true} 
                    useNativeDriver={true} 
                    animationType="timing" 
                    borderRadius={8}  
                    width={width*0.8} 
                    color={colors.mainBackgroundColor} 
                    borderColor={'black'} 
                />
                <Text style={styles.loadDataText}>Đang tải dữ liệu</Text>
            </View>
        </View>
    )
}
export default Splash;