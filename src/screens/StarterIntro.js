import React from 'react';
// import { Text } from 'react-native';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:#FFF;
    padding:0 30px;
`;

const WelcomeText = styled.Text`
    font-size:22px;
    color:#333;
    margin-top:50px;
`;
const WelcomeImage = styled.View`
    flex:1;
    justify-content:center;
`;
const WelcomeLogo = styled.Image`
    width:200px;
    height:200px;
`;

const BeginConfigArea = styled.View`
    width:100%;
    margin-bottom:50px;
`;
const ButtonText = styled.Text`
    color:#FFF;
`;


 const Page = (props) => {

    const start = () => {
        props.navigation.navigate('LoginPage');
    };

     return (
         <Container>
             <WelcomeText>Muscle Builder Tracker</WelcomeText>
             <WelcomeImage>
                 <WelcomeLogo source={require('../assets/logo2.png')} />
             </WelcomeImage>
             <BeginConfigArea>
               <DefaultButton width="100%" bgcolor="#0072c0" underlayColor="#0b7ac6" onPress={start}>
                   <ButtonText>Get Started</ButtonText>
                 </DefaultButton>
             </BeginConfigArea>
         </Container>
     );
 }

Page.navigationOptions = {
    headerShown:false
};

export default Page;