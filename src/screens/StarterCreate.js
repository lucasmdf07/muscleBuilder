import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';
import auth from '@react-native-firebase/auth';
// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const Container = styled.SafeAreaView`
    flex:1;

    align-items:center;
    background-color:#FFF;
    padding:0 30px;
`;

const HeaderText = styled.Text`
    font-size:22px;
    color:#333;
    margin:50px 0;
`;
const NameInput = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
    margin-bottom:10px;
`;

const BeginConfigArea = styled.View`
    width:100%;
    margin-bottom:50px;
`;

const NextButton = styled.Button``;

const ButtonText = styled.Text`
    color:#FFF;
`;


const Page = (props) => {

    const login = () => {
        createUser();
        props.navigation.navigate('LoginPage');
    };


    const nextAction = () => {
        // if(!props.name) {
        //     alert("You need a name to continue");
        //     return
        // }
        props.navigation.navigate('LoginPage');
    }

    const handleChangeName = (t) => {
        props.setName(t);
        props.navigation.setParams({name:t});
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  function LoginApp() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
      return (
        <View>
          <Text>Login</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>Welcome {user.email}</Text>
      </View>
    );
  }

  function signInFirebase() {
    auth()
    // .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
  }
  function createUser() {
    auth()
    // .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
  }

  function logoff(){
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }



  async function onGoogleButtonPress() {

    GoogleSignin.configure({
      webClientId: '1057360946439-sdob7mlectn2ofppptslvvpcdv7c6d05.apps.googleusercontent.com',
      scopes: ["profile","email"],
    });
    
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  function GoogleSignIn() {
    return (
      <GoogleSigninButton
        style={{
          width: 242,
          alignSelf: "center",
          marginBottom: 16,
        }}
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!")
          )
        }
      />
    );
  }


    return (
        <Container>
            <HeaderText>Create Username</HeaderText>
            {/* <Text>create username</Text> */}
            <Text>EMAIL</Text>
            <NameInput
                placeholder="Type your email here"
                onChangeText={(value) => setEmail(value)}
                autoCapitalize="none"
            />
            <Text>Password</Text>
            <NameInput
                placeholder="Type your password here"
                onChangeText={(value) => setPassword(value)}
                autoCapitalize="none"
            />
            <BeginConfigArea>
               <DefaultButton bgcolor="#0072c0" underlayColor="#0b7ac6" onPress={login}>
                   <ButtonText>Create Username</ButtonText>
                 </DefaultButton>
            </BeginConfigArea>
        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        // if(!navigation.state.params || !navigation.state.params.name){
        //     alert('You need a name to continue')
        //     return
        // }
        navigation.navigate('LoginPage');
    }

    return {
        // title:'',
        // headerRight: () => <NextButton title="Next" onPress={nextAction} />,

    //     headerRight:<NextButton navigation={navigation} />,
        headerRightContainerStyle:{
        marginRight:10
        }

    }
}


const mapStateToProps = (state) => {
    return {
      name: state.userReducer.name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=> dispatch({type:'SET_NAME', payload:{name}})
        
        // setName:(name)=> setName(name, dispatch),
        // reset:()=>reset(dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Page);