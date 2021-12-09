import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;

    align-items:center;
    background-color:#FFF;
    padding:50px 30px;
`;

const HeaderText = styled.Text`
    font-size:15px;
    color:#333;
    text-align:center;
    margin-bottom:30px;
`;


const NextButton = styled.Button``;
const BoldText = styled.Text`
    font-weight:bold;
`;
const DaysArea = styled.View`
    flex-direction: row;
    flex-wrap:wrap;
    justify-content:space-between;
`;

const Page = (props) => {

    // const nextAction = () => {
    //     if(!props.name) {
    //         alert("Você precisa de um nome!");
    //         return
    //     }
    //     props.navigation.navigate('StarterDias');
    // }

const toggleDay = (d) => {
    let newWorkoutDays = [...props.workoutDays];
    if(!props.workoutDays.includes(d)) {
        // add
        newWorkoutDays.push(d);
        props.setWorkoutDays(newWorkoutDays);
    } else {
        // remove
        newWorkoutDays = newWorkoutDays.filter(i => i != d);
    }
    props.setWorkoutDays(newWorkoutDays);
    props.navigation.setParams({workoutDays:newWorkoutDays});
}

    let firstName = props.name.split(' ')[0]; 

    return (
        <Container>
            <HeaderText>Hello, <BoldText>{firstName}</BoldText>!</HeaderText>
            <HeaderText>How many <BoldText>days</BoldText> do you plan on working out?</HeaderText>

            <DaysArea>
                <DefaultButton bgcolor={props.workoutDays.includes(1)?'#A5E8BC':false} onPress={()=>toggleDay(1)}  width="100px" style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Monday</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(2)?'#A5E8BC':false} onPress={()=>toggleDay(2)}  width="100px" style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Tuesday</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(3)?'#A5E8BC':false} onPress={()=>toggleDay(3)}  width="120px" style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Wednesday</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(4)?'#A5E8BC':false} onPress={()=>toggleDay(4)}  width="100px" style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Thursday</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(5)?'#A5E8BC':false} onPress={()=>toggleDay(5)}  width="100px" style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Friday</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(6)?'#A5E8BC':false} onPress={()=>toggleDay(6)}  width="100px" style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Saturday</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(0)?'#A5E8BC':false} onPress={()=>toggleDay(0)}  width="100px" style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Sunday</Text>
                </DefaultButton>
            </DaysArea>
        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.workoutDays.length){
            alert('You need to select at least one day')
            return
        }
        navigation.navigate('StarterNivel');
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
      name: state.userReducer.name,
      workoutDays:state.userReducer.workoutDays
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=> dispatch({type:'SET_NAME', payload:{name}}),
        setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS',payload:{workoutDays}})
        // setName:(name)=> setName(name, dispatch),
        // reset:()=>reset(dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Page);