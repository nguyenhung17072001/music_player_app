import React, {useState, useEffect, useRef, useContext} from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Modal } from "react-native";
import theme from "../Core/theme";
const {icons, images,font, colors, strings} = theme;
import Context from "../Core/Context";
import Icon  from "react-native-vector-icons/Ionicons";
const {height, width}=Dimensions.get('window')
import ModalForm from "./ModalForm";
import { useNavigation } from "@react-navigation/native";


const Header =(props)=> {
    const nav = useNavigation()
    const languageTheme = useContext(Context);
    //console.log(languageTheme);
    const language = languageTheme.language;
    
    const [visibleModal, setVisibleModal] = useState(false)
    const chooseVietnamHandle=()=> {
        languageTheme.setLanguage("vietnam");
    }
    const chooseEnglishHandle=()=> {
        languageTheme.setLanguage("english");
    }
    return(
        <View style={[styles.headerContainer, {backgroundColor: props.type=="home"?colors.mainBackgroundColor:"white"}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {props.type=="home"?(
                    <TouchableOpacity onPress={()=> nav.openDrawer()}>
                        <Image resizeMode="contain" style={styles.image} source={icons.ic_drawer} />
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity onPress={()=> nav.goBack()}>
                        <Icon name="chevron-back-outline" size={28} color={"black"} />
                    </TouchableOpacity>
                )}
                <Text style={[styles.name, {color: props.type=="home"?"white":"black"}]}>{props.name}</Text>
            </View>
            <TouchableOpacity>
                <Icon name="search" color={props.type=="home"?"white":"black"} size={20} />
            </TouchableOpacity>
            
        </View>
    )
    
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.mainBackgroundColor,
        width: width,
        height: height*0.06,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: width*0.03
    },
    image: {
        //borderRadius: 20,
        height: width * 0.06,
        width: width * 0.05,
        //backgroundColor: 'blue'
    },
    name: {
        color: "white",
        fontFamily: font.medium,
        marginLeft: width*0.06,
        fontSize: 16
    },
    chooseLangueText: {
        color: colors.mainText,
        fontFamily: font.bold,
        fontWeight: 'bold',
        fontSize: 16,
    }, 
    chooseLangueImg: {
        height: height*0.07,
        width: width*0.17,
        //backgroundColor: 'blue'
    },
    languageText: {
        color: colors.mainText,
        textAlign: 'center',
        marginBottom: height*0.01
    },
    languageButton: {
        borderRadius: 10,
        marginTop: 10
    }
})
export default Header;