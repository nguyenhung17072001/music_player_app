import React, {useContext, useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView, Platform, PermissionsAndroid, FlatList } from "react-native";
import theme from "../../Core/theme";
const {font, icons, colors, images, strings}=theme;
import styles from "./HomeStyle";
import Header from "../../components/Header";
import Context from "../../Core/Context";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import recommendedData from "../../assets/data/recommendedData";
console.log("recommendedData: ", recommendedData)
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
   

    const recommendedItem=({item})=> {
        return (
            <TouchableOpacity style={styles.recommendedItem}>
                <Image resizeMode="cover" style={styles.recommendedImage} source={item.image} />
                <Text>{item.name}</Text>
                <Text>{item.singer}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={colors.mainBackgroundColor} />
            <Header type="home" name="" />
            <View style={styles.recommended}>
                <Text style={styles.recommendedText}>
                    Recommended for you
                </Text>
                <FlatList
                    style={{marginTop: 10}}
                    horizontal
                    data={recommendedData}
                    renderItem={recommendedItem}
                    keyExtractor={(item)=> item}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
           
        </ScrollView>
    )
}


export default Home;