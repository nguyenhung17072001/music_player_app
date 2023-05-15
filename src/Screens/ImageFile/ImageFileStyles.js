import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../Core/theme'
const { colors } = theme;


const {height, width} = Dimensions.get('window');
const {font} = theme;
const styles= StyleSheet.create({
    container:{
        flex:1,
        
    },
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width*0.03,
        marginVertical: height*0.002,
        elevation: 2,
        marginHorizontal: width*0.01,
        borderRadius: 8,
        paddingVertical: height*0.01

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 7
    },
    fileIcon: {
        height: width*0.1,
        width: width*0.1
    },
    fileName: {
        
        color: colors.mainText,
        fontWeight: 'bold'
    },
    time: {
        color: '#999',
        fontSize: 11
    }
    
    
})
export default styles;