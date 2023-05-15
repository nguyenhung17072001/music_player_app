import React, {useState, useEffect, useRef} from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Modal } from "react-native";
import theme from "../Core/theme";
const {icons, images, strings,font, colors} = theme;

const {height, width}=Dimensions.get('window')




const TabIcon =(props)=> {
    return(
        <Image 
            source={props.source}
            style={[styles.icon, {tintColor: props.tintColor}]}
            resizeMode="contain"
            
        />
    )
    
}

export default TabIcon;