import React from 'react';
import {useSelector} from 'react-redux';
import MainStack from '../navigators/MainStack';
import AuthNavigator from '../navigators/authNavigator';

const DefaultNavigator = () => {
  const loggedIn = useSelector((state) => state.userReducer.loggedIn);

  return loggedIn ? <MainStack /> : <AuthNavigator />;
};

export default DefaultNavigator;
