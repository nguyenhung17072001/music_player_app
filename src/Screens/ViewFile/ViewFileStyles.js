import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../Core/theme'
const { colors } = theme;


const {height, width} = Dimensions.get('window');
const {font} = theme;
const styles= StyleSheet.create({
    container:{
        flex:1,
        
    },
    pdf: {
        width: width,
        height: height
    }
    
})
export default styles;