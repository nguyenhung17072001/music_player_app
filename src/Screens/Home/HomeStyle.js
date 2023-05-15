import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../Core/theme'
const { colors } = theme;


const {height, width} = Dimensions.get('window');
const {font} = theme;
const styles= StyleSheet.create({
    container:{
        flex:1,
        
    },
    text: {
        color: 'red'
    },
    formContainer: {
        marginTop: height*0.02
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: width*0.04,
        marginVertical: height*0.017
    },
    form: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    icon: {
        height: width*0.1,
        width: width*0.1
    },
    typeText: {
        fontWeight: 'bold',
        color: colors.mainText,
        textAlign: 'center'
    },
    lengthText: {
        color: "#A9A9A9",
        fontSize: 12
    }
    
})
export default styles;