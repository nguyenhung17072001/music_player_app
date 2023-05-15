import React, {useContext, useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView, Platform, PermissionsAndroid, FlatList } from "react-native";
import theme from "../../Core/theme";
const {font, icons, colors, images, strings}=theme;
import styles from "./HomeStyle";
import Header from "../../components/Header";
import Context from "../../Core/Context";
import ModalForm from "../../components/ModalForm";
import Icon from "react-native-vector-icons/"
import RNFS from 'react-native-fs';
import RNFetchBlob from "react-native-fetch-blob";
import DocumentPicker from "react-native-document-picker"
import pLimit from "p-limit";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home=()=> {
    const nav=useNavigation()
    const languageTheme = useContext(Context);
    //console.log(languageTheme);
    const [allFile, setAllFile] = useState([])

    const getData=()=> {
        AsyncStorage.getItem("data").then((data)=> {
            
            
            setAllFile(JSON.parse(data))
        })
    }
    //console.log(allFile)

    useEffect(()=> {
        getData();
    }, [])
   

    
    
    
    const PDFData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "pdf"
    });

    const DocData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "doc" || extension== "docx"
    });


    const ExcelData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "xlsx" || extension== "xls" || extension== "xlsm" || extension=="csv";
    });

    const PowerpointData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "pptx" || extension== "ppt" || extension== "pptm";
    });

    const TxtData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "txt";
    });

    const ImageData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "jpg" || extension== "png" || extension== "jpge" || extension=="gif" || extension == "tiff" || extension=="bmp"|| extension=="svg";
    });


    
    //console.log("ImageData====================: ", ImageData)
    
    



    
    
      
    

    
    
    
    
    
      
    //const arr=[]
    
    
   
    
async function pickDocument() {
    try {
      DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      }).then((result)=> {
        console.log(result)
      })
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Error!
      }
    }
  }

   
        
    
 
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.mainBackgroundColor} />
            <Header type="home" name="Trình đọc tài liệu" />
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={()=> nav.navigate("AllFile")} style={styles.form}>
                        <Image resizeMode="contain" style={styles.icon} source={icons.icon_all} />
                        <Text style={styles.typeText}>Tất cả</Text>
                        <Text style={styles.lengthText}>{allFile?.length} tệp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> nav.navigate("PDFFile")} style={styles.form}>
                        <Image resizeMode="contain" style={styles.icon} source={icons.ic_pdf} />
                        <Text style={styles.typeText}>PDF</Text>
                        <Text style={styles.lengthText}>{PDFData?PDFData?.length: "0"} tệp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> nav.navigate("DocFile")} style={styles.form}>
                        <Image resizeMode="contain" style={styles.icon} source={icons.ic_doc} />
                        <Text style={styles.typeText}>Word</Text>
                        <Text style={styles.lengthText}>{DocData?DocData?.length:"0"} tệp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> nav.navigate("ExcelFile")} style={styles.form}>
                        <Image resizeMode="contain" style={styles.icon} source={icons.ic_xls} />
                        <Text style={styles.typeText}>Excel</Text>
                        <Text style={styles.lengthText}>{ExcelData?ExcelData?.length:"0"} tệp</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={()=> nav.navigate("PPTFile")} style={styles.form}>
                        <Image resizeMode="contain" style={styles.icon} source={icons.ic_ppt} />
                        <Text style={styles.typeText}>PPT</Text>
                        <Text style={styles.lengthText}>{PowerpointData?PowerpointData?.length:"0"} tệp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>nav.navigate("TXTFile")} style={styles.form}>
                        <Image resizeMode="contain" style={styles.icon} source={icons.ic_txt} />
                        <Text style={styles.typeText}>TXT</Text>
                        <Text style={styles.lengthText}>{TxtData?TxtData?.length:"0"} tệp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> nav.navigate("ImageFile")} style={styles.form}>
                        <Image resizeMode="contain" style={styles.icon} source={icons.ic_image} />
                        <Text style={styles.typeText}>Ảnh</Text>
                        <Text style={styles.lengthText}>{ImageData?.length} tệp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.form}>
                        <Image resizeMode="contain" style={styles.icon} source={icons.ic_search_file} />
                        <Text style={styles.typeText}>Các thư mục khác</Text>
                        <Text style={styles.lengthText}>n tệp</Text>
                    </TouchableOpacity>
                </View>
            </View>
           
        </View>
    )
}


export default Home;