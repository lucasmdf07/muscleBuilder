import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;

    align-items:center;
    background-color:#FFF;
    margin:50px 30px;
`;

const HeaderText = styled.Text`
    font-size:15px;
    color:#333;
    text-align:center;
    margin-bottom:30px;
`;


const NextButton = styled.Button``;

const LevelArea = styled.View`
    width: 100%;
`;
const BoldText = styled.Text`
    font-weight:bold;
`;


const Page = (props) => {

    // const nextAction = () => {
    //     if(!props.name) {
    //         alert("Você precisa de um nome!");
    //         return
    //     }
    //     props.navigation.navigate('StarterDias');
    // }

    let funnyPhrase = '';
    switch(props.workoutDays.length){
        case 1:
            funnyPhrase = 'One day a week is good start off!';
            break;
        case 2:
            funnyPhrase = 'Two days a week is a great way to get better';
            break;
        case 3:
            funnyPhrase = 'Three days a week is usually a good goal';
            break;
        case 4:
            funnyPhrase = 'Four days a week is outstanding';
            break;
        case 5:
            funnyPhrase = 'Five days a week means you are not joking';
            break;
        case 6:
            funnyPhrase = 'Six days a week means you are very serious about it';
            break;
        case 7:
            funnyPhrase = 'Seven days a week is incredible';
            break;
    }

    const setMyLevel = (l) => {
        props.setLevel(l);
        props.navigation.setParams({level:l});
    }

    return (
        <Container>
            <HeaderText>{funnyPhrase}</HeaderText>
            <HeaderText><BoldText>What's your level today?</BoldText></HeaderText>

            <LevelArea>
                <DefaultButton bgcolor={props.level=='beginner'?'#A5E8BC':false} onPress={()=>setMyLevel('beginner')} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Beginner</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.level=='intermediate'?'#A5E8BC':false}  onPress={()=>setMyLevel('intermediate')} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Intermediate</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.level=='advanced'?'#A5E8BC':false}  onPress={()=>setMyLevel('advanced')} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Advanced</Text>
                </DefaultButton>
            </LevelArea>
        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.level){
            alert('voce precisa escolher uma opcao')
            return
        }
        navigation.navigate('StarterRecommendations');
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
      level: state.userReducer.level,
    //   name: state.userReducer.name,
      workoutDays:state.userReducer.workoutDays
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setName:(name)=> dispatch({type:'SET_NAME', payload:{name}}),
        // setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS',payload:{workoutDays}})
        setLevel:(level)=>dispatch({type:'SET_LEVEL',payload:{level}})
        // setName:(name)=> setName(name, dispatch),
        // reset:()=>reset(dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Page);