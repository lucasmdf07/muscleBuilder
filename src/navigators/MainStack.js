import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//import {useSelector} from 'react redux'; 
import Preload from '../screens/Preload';
import StarterStack from './StarterStack';
import AppTab from './AppTab';
//import AuthNavigator from '../navigators/authNavigator';


const MainStack = createStackNavigator(
  {
    Preload,
    StarterStack,
    AppTab,
  },
  {
    initialRouteName: 'Preload',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(MainStack);
