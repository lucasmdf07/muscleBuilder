import React, { useState }  from 'react';
// import { Text } from 'react-native';
// import { StackActions, NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll';
import HomeDaysStatus from '../components/HomeDaysStatus';
// import DefaultButton from '../components/DefaultButton';


const Container = styled.SafeAreaView`
    flex:1;
    padding:0 30px;
    background-color:#FFFFFF;
`;

const Label = styled.Text`
    font-size:15px;
    font-weight:bold;
    margin-top:20px;
    margin-bottom:10px;
`;

const Input = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;

const ListArea = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;

const DayItem = styled.TouchableHighlight`
    width:30px;
    height:30px;
    border-radius:5px;
    background-color:#EEE;
    justify-content:center;
    align-items:center;
`;

const DayItemText = styled.Text``;

const LevelItem = styled.TouchableHighlight`
    padding:0 15px;
    background-color:#EEE;
    height:30px;
    border-radius:5px;
    justify-content:center;
    align-items:center;
`;

const LevelItemText = styled.Text``;


const Page = (props) => {

    const toggleWorkoutDays = (d) => {
        let newWorkoutDays = [...props.workoutDays];
        if(newWorkoutDays.includes(d)) {
            if(newWorkoutDays.length == 1) {
                alert('You need to train at least once a week');
                return;
            }
            newWorkoutDays = newWorkoutDays.filter(i=>i!=d);

        } else {
            newWorkoutDays.push(d);
        }
        props.setWorkoutDays(newWorkoutDays);
    }


    return (
        <Container>
            <Label>Your full name:</Label>
            <Input value={props.name} onChangeText={e=>props.setName(e)} />
            <Label>Days you are training:</Label>
            <ListArea>
                <DayItem onPress={()=>toggleWorkoutDays(1)} style={props.workoutDays.includes(1)?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <DayItemText>M</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDays(2)} style={props.workoutDays.includes(2)?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <DayItemText>T</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDays(3)} style={props.workoutDays.includes(3)?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <DayItemText>W</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDays(4)} style={props.workoutDays.includes(4)?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <DayItemText>T</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDays(5)} style={props.workoutDays.includes(5)?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <DayItemText>F</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDays(6)} style={props.workoutDays.includes(6)?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDays(0)} style={props.workoutDays.includes(0)?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <DayItemText>S</DayItemText>
                </DayItem>
            </ListArea>
            <Label>Your Level:</Label>
            <ListArea>
                <LevelItem onPress={()=>props.setLevel('beginner')} style={props.level=='beginner'?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <LevelItemText>Beginner</LevelItemText>
                </LevelItem>
                <LevelItem onPress={()=>props.setLevel('intermediate')} style={props.level=='intermediate'?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <LevelItemText>Intermediate</LevelItemText>
                </LevelItem>
                <LevelItem onPress={()=>props.setLevel('advanced')} style={props.level=='advanced'?{backgroundColor:'#A5E8BC'}:{}} underlayColor="transparent">
                    <LevelItemText>Advanced</LevelItemText>
                </LevelItem>
            </ListArea>

        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {

 
    return {
        title:'Settings',
        }
    
}

const mapStateToProps = (state) => {
    return {
        // dailyProgress:state.userReducer.dailyProgress,
        // workoutDays:state.userReducer.workoutDays
        name:state.userReducer.name,
        workoutDays:state.userReducer.workoutDays,
        level:state.userReducer.level
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addProgress:(date)=>dispatch({type:'ADD_PROGRESS', payload:{date}}),
        // delProgress:(date)=>dispatch({type:'DEL_PROGRESS', payload:{date}}),
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
        setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS', payload:{workoutDays}}),
        setLevel:(level)=>dispatch({type:'SET_LEVEL', payload:{level}}),

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Page);