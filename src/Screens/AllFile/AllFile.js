import React, {useContext, useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, Dimensions, Platform, PermissionsAndroid, FlatList } from "react-native";
import theme from "../../Core/theme";
const {font, icons, colors, images, strings}=theme;
import styles from "./AllFileStyles";
import Header from "../../components/Header";
import Context from "../../Core/Context";
import ModalForm from "../../components/ModalForm";
const {height, width} = Dimensions.get('window');
import moment from 'moment'
import { FlatGrid, SimpleGrid } from 'react-native-super-grid';
import RNFS from 'react-native-fs';
import RNFetchBlob from "react-native-fetch-blob";
import DocumentPicker from "react-native-document-picker"
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from "@react-native-async-storage/async-storage";
const AllFile=(props)=> {
    const languageTheme = useContext(Context);
    //console.log(languageTheme);
    const [allFile, setAllFile] = useState([])
    const ref = useRef();
    const getData=()=> {
        AsyncStorage.getItem("data").then((data)=> {
            
            
            setAllFile(JSON.parse(data))
        })
    }
    //console.log(allFile)

    useEffect(()=> {
        getData();
    }, []);

    const fileTypesPriority = ["pdf", "doc", "docx", "xls", "xlsx", "xlsm", "csv","pptx", "ppt", "pptm", "txt", "jpg", "jpeg", "png", "gif", "tiff", "bmp", "svg"];

    const sortedForExtensionFiles = allFile.sort((a, b) => {
        let re = /(?:\.([^.]+))?$/;
        //let extension = re.exec(data.name)[1];
        const extA = re.exec(a.name)[1];
        const extB = re.exec(b.name)[1];
    
        const indexA = fileTypesPriority.indexOf(extA);
        const indexB = fileTypesPriority.indexOf(extB);
    
        if (indexA < indexB) {
            return -1;
        }
        if (indexA > indexB) {
            return 1;
        }
        return 0;
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
            } else if(extension == "doc" || extension== "docx") {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.ic_doc} 
                    />
                )
            } else if(extension == "xlsx" || extension== "xls" || extension== "xlsm" || extension=="csv") {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.ic_xls} 
                    />
                )
            } else if(extension == "pptx" || extension== "ppt" || extension== "pptm") {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.ic_ppt} 
                    />
                )
            } else if(extension == "txt") {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.ic_txt} 
                    />
                )
            } else if(extension == "jpg" || extension== "png" || extension== "jpge" || extension=="gif" || extension == "tiff" || extension=="bmp"|| extension=="svg") {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.ic_image} 
                    />
                )
            } 
            else {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.icon_all} 
                    />
                )
            }
            
        }
        return(
            <TouchableOpacity onPress={()=> alert('hung')} style={styles.item}>
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
            <Header name="Tất cả các tệp" />
            <View>
                {/* <FlatList
                    style={{}}
                    data={sortedForExtensionFiles?sortedForExtensionFiles:[]}
                    renderItem={renderItem}
                    keyExtractor={(item)=> item.path}
                    removeClippedSubviews
                /> */}
                <FlatGrid
                    style={{marginBottom: height*0.06}}
                    ref={ref}
                    itemDimension={width}
                    data={sortedForExtensionFiles?sortedForExtensionFiles:[]}
                    renderItem={renderItem}
                    keyExtractor={(item)=> item.path}
                    removeClippedSubviews
                />
            </View>
            
           
        </View>
    )
}


export default AllFile;