import React, {useState, useEffect, useRef} from "react";
import { View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity, Modal } from "react-native";
import theme from "../Core/theme";
const {icons, images, strings,font, colors} = theme;

const {height, width}=Dimensions.get('window')


/* 
props: 
- visible
- onRequestClose
- lable
- textAlert
*/

const ModalForm =(props)=> {
    const scaleValue= useRef(new Animated.Value(0)).current;


    useEffect(()=> {
        if(props.visible==true){
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        } else{
            Animated.spring(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }, [props.visible])



    return(

        <Modal 
            transparent
            visible={props.visible}
            onRequestClose={props.onRequestClose}
        >
            <View style={[styles.modalBackground, ]}>
                <Animated.View style={[styles.modalContainer, {transform: [{scale: scaleValue}] }]}>
                    {props.children}
                    
                </Animated.View>

            </View>
            
        </Modal>
        
    )
}
    




const styles = StyleSheet.create({
   
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',

        //marginTop: 22
    },
    modalContainer: {
        //margin: 20,
        
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 8,
        width: width*0.9,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.mainBackgroundColor
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
       
    },
    content: {
        color: colors.mainText,
        fontSize: 14,
        fontFamily: font.medium,
        paddingHorizontal: width*0.06,
        textAlign: 'center',
        marginVertical: height*0.014

    },
    row: {
        flexDirection: 'row',

    },
    button: {
        backgroundColor: colors.mainBackgroundColor,
        width: width*0.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: width*0.03
        
    },
    buttonText: {
        color: 'white',
        fontFamily: font.bold,
        paddingVertical: height*0.006,
        fontSize: 16
    },
    

   
})

export default ModalForm;