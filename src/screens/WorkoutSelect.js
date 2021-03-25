import React, { useState }  from 'react';
// import { Text } from 'react-native';
// import { StackActions, NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Workout from '../components/Workout';
import { StackActions, NavigationActions } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation-stack';
import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll';
import HomeDaysStatus from '../components/HomeDaysStatus';
// import DefaultButton from '../components/DefaultButton';


const Container = styled.SafeAreaView`
    flex:1;
    background-color:#FFFFFF;
    padding:20px;
`;

const WorkoutList = styled.FlatList`
    flex:1;
`;

const Title = styled.Text`
    margin-bottom:10px;
    padding:5px;
`;


const Page = (props) => {

    let lastWorkout = false;

    if(props.lastWorkout) {
        lastWorkout = props.myWorkouts.find(i=>i.id == props.lastWorkout);
    }

    const goWorkout = (workout) =>{
        props.navigation.navigate('WorkoutCheckList', {workout});
    }

    return (
        <Container>
            {lastWorkout &&
                <>
                    <Title>Your last training was:</Title>
                    <Workout data={lastWorkout} />
                </>
            }
            <Title>Choose your training for today:</Title>
            <WorkoutList
                data={props.myWorkouts}
                renderItem={({item})=>
                    <Workout
                        data={item}
                        goAction={()=>goWorkout(item)}

                    />
                }
            />


        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {

    const handleBackAction = () => {
        const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AppTab' })],
                });
        
        navigation.dispatch(resetAction);
            }
    
    return {
        title:'Select your training',
        // headerLeft:<HeaderBackButton onPress={handleBackAction} />
        headerLeft: () => <HeaderBackButton onPress={handleBackAction} />
        }
    
}

const mapStateToProps = (state) => {
    return {
        lastWorkout:state.userReducer.lastWorkout,
        myWorkouts:state.userReducer.myWorkouts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Page);