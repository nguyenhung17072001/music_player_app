import React, {useContext, useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, Dimensions, Platform, PermissionsAndroid, FlatList } from "react-native";
import theme from "../../Core/theme";
const {font, icons, colors, images, strings}=theme;
import styles from "./ImageFileStyles";
import Header from "../../components/Header";
import Context from "../../Core/Context";
import ModalForm from "../../components/ModalForm";
const {height, width} = Dimensions.get('window');
import moment from 'moment'
import RNFS from 'react-native-fs';
import RNFetchBlob from "react-native-fetch-blob";
import DocumentPicker from "react-native-document-picker"
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatGrid } from "react-native-super-grid";

const ImageFile=(props)=> {
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

    const ImageData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "jpg" || extension== "png" || extension== "jpge" || extension=="gif" || extension == "tiff" || extension=="bmp"|| extension=="svg";
    });

    const renderItem=({item})=> {
        const FileIcon = ()=>{
            let re = /(?:\.([^.]+))?$/;
            let extension = re.exec(item?.name)[1];
            if(extension == "jpg" || extension== "png" || extension== "jpge" || extension=="gif" || extension == "tiff" || extension=="bmp"|| extension=="svg") {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.ic_image} 
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
            <Header name="Tệp ảnh" />
            <View>
                <FlatGrid
                    style={{marginBottom: height*0.06}}
                    ref={ref}
                    itemDimension={width}
                    data={ImageData?ImageData:[]}
                    renderItem={renderItem}
                    keyExtractor={(item)=> item.path}
                    removeClippedSubviews
                />
            </View>
            
           
        </View>
    )
}


export default ImageFile;