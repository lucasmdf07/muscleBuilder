import React from 'react';
// import { Text } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';

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
`;

const NextButton = styled.Button``;


const Page = (props) => {

    const nextAction = () => {
        if(!props.name) {
            alert("You need a name to continue");
            return
        }
        props.navigation.navigate('StarterDias');
    }

    const handleChangeName = (t) => {
        props.setName(t);
        props.navigation.setParams({name:t});
    }

    return (
        <Container>
            <HeaderText>What's your name?</HeaderText>
            <NameInput
                 value={props.name}
                 onChangeText={handleChangeName}
                //  onChangeText={changeTextName}
                autoFocus={true}
                autoCapitalize="words"
                onSubmitEditing={nextAction}
            />
        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.name){
            alert('You need a name to continue')
            return
        }
        navigation.navigate('StarterDias');
    }

    return {
        title:'',
        headerRight: () => <NextButton title="Next" onPress={nextAction} />,

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