import React, {useContext, useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, Dimensions, Platform, PermissionsAndroid, FlatList } from "react-native";
import theme from "../../Core/theme";
const {font, icons, colors, images, strings}=theme;
import styles from "./ExcelFileStyles";
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
import XLSX from 'xlsx';
import { useNavigation } from "@react-navigation/native";
import FileViewer from "react-native-file-viewer";


const ExcelFile=(props)=> {
    const nav = useNavigation();
    const languageTheme = useContext(Context);
    //console.log(languageTheme);
    const ref = useRef();
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

    const ExcelData = allFile.filter((data)=>{
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(data.name)[1];
        return extension == "xlsx" || extension== "xls" || extension== "xlsm" || extension=="csv";
    });
   

    const renderItem=({item})=> {
        const FileIcon = ()=>{
            let re = /(?:\.([^.]+))?$/;
            let extension = re.exec(item?.name)[1];
            if(extension == "xlsx" || extension== "xls" || extension== "xlsm" || extension=="csv") {
                return(
                    <Image 
                        style={styles.fileIcon} 
                        resizeMode="contain" 
                        source={icons.ic_xls} 
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

        const openFile=()=> {
            console.log("item.path: ", item.path)
            FileViewer.open(`file:///${item.path}`);
            /* nav.navigate("ViewExcel", {
                path: item.path
            }) */
            /* RNFS.readFile(item.path, 'base64').then((fileData) => {
                const workbook = XLSX.read(fileData, { type: 'base64' });
              
                // Lấy dữ liệu từ sheet đầu tiên
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
              
                nav.navigate("ViewExcel", {
                    data: data
                })
            }).catch((error) => {
                alert("Lỗi khi mở file ", item?.name)
                console.log(error);
            }); */
              
        }
        return(
            <TouchableOpacity onPress={openFile} style={styles.item}>
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
            <Header name="Tệp Excel" />
            <View>
                <FlatGrid
                    style={{marginBottom: height*0.06}}
                    ref={ref}
                    itemDimension={width}
                    data={ExcelData?ExcelData:[]}
                    renderItem={renderItem}
                    keyExtractor={(item)=> item.path}
                    removeClippedSubviews
                />
            </View>
            
           
        </View>
    )
}


export default ExcelFile;