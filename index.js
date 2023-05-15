/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//import { Flipper } from 'react-native-flipper';

if(__DEV__) {
    //Flipper.setFlipperEnabled(true);
    console.log("dev............")
}

AppRegistry.registerComponent(appName, () => App);
