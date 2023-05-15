import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../Core/theme'
const { colors } = theme;


const {height, width} = Dimensions.get('window');
const {font} = theme;
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.mainBackgroundColor,
        
    },
    recommended: {
        paddingLeft: width*0.04,
        marginVertical: height*0.01
    },
    recommendedText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    recommendedItem: {
        alignItems: 'center',
        marginRight: width*0.02 
    },
    recommendedImage: {
        height: height*0.25,
        width: width*0.5,
        elevation: 4,
        borderRadius: 10
    }
    
})
export default styles;