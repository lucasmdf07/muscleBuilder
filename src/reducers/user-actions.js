import axios from 'axios';
import {LOADING, SIGN_IN, SIGN_UP, SUCCESS, ERROR} from './types';

export const signUp = (email, password, name) => {
  return async (dispatch) => {
    dispatch({type: LOADING});
    try {
      await axios.post('https://musclebuilder.onrender.com/muscle/signup', {
        email,
        password,
        name,
      });

      dispatch({type: SIGN_UP});

      dispatch({type: SUCCESS, show: true});
      dispatch({type: ERROR, error: undefined});
      dispatch({type: LOADING});
    } catch (err) {
      dispatch({type: LOADING});
      dispatch({type: SUCCESS, show: false});
      dispatch({type: ERROR, error: err});
      console.log(err);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({type: LOADING});
    try {
      await axios.post('https://musclebuilder.onrender.com/muscle/signin', {
        email,
        password,
      });
      dispatch({type: SIGN_IN});

      dispatch({type: SUCCESS, show: true});
      dispatch({type: ERROR, error: undefined});
      dispatch({type: LOADING});
    } catch (err) {
      dispatch({type: LOADING});
      dispatch({type: SUCCESS, show: false});
      dispatch({type: ERROR, error: err});
      console.log('ERROR ON LOGIN', err);
    }
  };
};
