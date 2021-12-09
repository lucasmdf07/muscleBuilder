import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginView from '../components/LoginView';
import SignUpView from '../components/SignUpView';

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginView,
    },
    SignUp: {
      screen: SignUpView,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(AuthNavigator);
