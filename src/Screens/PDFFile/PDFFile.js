import React, {useContext, useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, Dimensions, Platform, PermissionsAndroid, FlatList } from "react-native";
import theme from "../../Core/theme";
const {font, icons, colors, images, strings}=theme;
import styles from "./PDFFileStyles";
import Header from "../../components/Header";
import Context from "../../Core/Context";
import ModalForm from "../../components/ModalForm";
const {height, width} = Dimensions.get('window');
import moment from 'moment'
import RNFS from 'react-native-fs';
import RNFetchBlob from "react-native-fetch-blob";
import DocumentPicker from "react-native-document-picker"
import Icon from "react-native-vector-icons/Ionicons"
import { FlatGrid } from "react-native-super-grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FileViewer from "react-native-file-viewer";
import { useNavigation } from "@react-navigation/native";
const PDFFile=(props)=> {
    const nav = useNavigation();
    const languageTheme = useContext(Context);
    const ref = useRef();
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
    }, []);

    const PDFData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "pdf"
    });
    const pdf=allFile?.filter((file)=> {
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(file.name)[1];
        return extension=="pdf";
    })
    //console.log("pdf: ", pdf)
   

    const renderItem=({item})=> {
        const FileIcon = ()=>{
            let re = /(?:\.([^.]+))?$/;
            let extension = re.exec(item?.name)[1];
            if(extension == "pdf") {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.ic_pdf} 
                    />
                )
            } else {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.icon_all} 
                    />
                )
            }
            
        }
        const openFIle =()=> {
            nav.navigate("ViewPDF", {
                path: item.path
            })
        }
        

        return(
            <TouchableOpacity onPress={openFIle} style={styles.item}>
                <View style={styles.row}>
                    <FileIcon />
                    <View style={{maxWidth: width*0.7 , paddingHorizontal: width*0.01}}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.fileName}>{item.name}</Text>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.time}>{moment(item.mtime).format("DD/MM/YYYY", "HH:MM")}</Text>
                            <Text style={styles.time}> {(item.size / 1024).toFixed(2)}kb</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <Icon name="bookmark-outline" color={"black"} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="ellipsis-vertical" color={"black"} size={20} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
    

    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} barStyle={"dark-content"}/>
            <Header name="Tệp PDF" />
            <View>
                <FlatList
                    style={{marginBottom: height*0.06}}
                    ref={ref}
                    itemDimension={width}
                    data={PDFData?PDFData:[]}
                    renderItem={renderItem}
                    keyExtractor={(item)=> item.path}
                    removeClippedSubviews
                />
            </View>
            
           
        </View>
    )
}


export default PDFFile;