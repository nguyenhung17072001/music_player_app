import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../Core/theme'
const { colors } = theme;


const {height, width} = Dimensions.get('window');
const {font} = theme;
const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: 'white'
    },
    appName:{
        fontSize: 16,
        fontFamily: font.bold,
        color:colors.mainBackgroundColor
    },
    brandName:{
        fontSize: 12.6,
        
        color:colors.mainBackgroundColor,
        fontFamily: font.medium,
        marginTop: height*0.01
    },
    logoImage: {
        width: width * 0.45,
        height: height * 0.09
    },
    loadDataText: {
        color: colors.mainBackgroundColor,
        fontFamily: font.medium,
        marginTop: 10,
        textAlign: 'center'
    }
})
export default styles;