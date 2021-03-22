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
`;

const WorkoutList = styled.FlatList`
    flex:1;
    padding:20px;
`;


const Page = (props) => {


    return (
        <Container>
            <WorkoutList
                data={props.myWorkouts}
                renderItem={({item})=>
                    <Workout
                        data={item}

                    />
                }
            />


        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {

    const handleBackAction = () => {
        navigation.dispatch(StackActions.reset({
            index:0,
            action:[
                NavigationActions.navigate({routeName:'AppTab'})
            ]
        }));
    }
    
    return {
        title:'Select your training',
        headerLeft:<HeaderBackButton onPress={handleBackAction} />
        }
    
}

const mapStateToProps = (state) => {
    return {
        myWorkouts:state.userReducer.myWorkouts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Page);