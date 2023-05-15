import React, {useState, useEffect} from "react";
import Context from "./Context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContextState = ({children}) => {
  const [theme, setTheme ]= useState('#131D36');
  const [language, setLanguage] = useState("vietnam");

  const getTheme = async () => {
    try {
        const color1 = await AsyncStorage.getItem('theme')
        let color = JSON.parse(color1)
        if(color != null){
          setTheme(color)
        }
        return color
    }
    catch (error) {
        console.log("Theme Get Error", error)
    }
  }
  useEffect(() =>{
    getTheme()
  },[]);



  
  const getLanguage = async () => {
    try {
        const language1 = await AsyncStorage.getItem('language')
        let language = JSON.parse(language1)
        if(language != null){
          setLanguage(language)
        }
        return language
    }
    catch (error) {
        console.log("language Get Error", error)
    }
  }
  useEffect(() =>{
    getTheme()
    getLanguage()
  },[])


  const themes ={
    language,
    setLanguage,
  }
  return(
    <Context.Provider value={themes}>
      {children}
    </Context.Provider>
  )
}
export default ContextState
  