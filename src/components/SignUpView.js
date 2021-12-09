import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../reducers/user-actions';

const SignUpView = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const loading = useSelector((state) => state.userReducer.loading);
  const error = useSelector((state) => state.userReducer.error);
  const success = useSelector((state) => state.userReducer.succcess);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    dispatch(signUp(email, password, name));

    if (error) {
      setErrorMessage('Unable to sign up, please verify inputs and try again');
      return;
    }
  };

  if (success) {
    setErrorMessage('');
  }

  return (
    <SafeAreaView>
      {loading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri: 'https://png.icons8.com/message/ultraviolet/50/3498db',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Name"
                keyboardType="default"
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri: 'https://png.icons8.com/message/ultraviolet/50/3498db',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri: 'https://png.icons8.com/message/ultraviolet/50/3498db',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Confirm Password"
                secureTextEntry={true}
                keyboardType="default"
                onChangeText={setConfirmPassword}
              />
            </View>

            {error ? (
              <View style={{width: '100%', paddingVertical: 20}}>
                <Text
                  style={{color: 'blue', fontSize: 15, textAlign: 'center'}}>
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={handleSignUp}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => props.navigation.navigate('Login')}>
              <Text>Login</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});

export default SignUpView;
