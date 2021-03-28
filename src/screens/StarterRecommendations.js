import React, { useEffect }  from 'react';
// import { Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
// import DefaultButton from '../components/DefaultButton';
import Workout from '../components/Workout';
import workoutJson from '../presetWorkouts.json';

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

const WorkoutList = styled.FlatList`
    width:100%;
`;




const Page = (props) => {

    // const nextAction = () => {
    //     if(!props.name) {
    //         alert("Você precisa de um nome!");
    //         return
    //     }
    //     props.navigation.navigate('StarterDias');
    // }


    useEffect(()=>{
        props.navigation.setParams({myWorkouts:props.myWorkouts});
    }, [props.myWorkouts]);

    const addWorkout = (item) => {
        // alert(item.name);
        if(props.myWorkouts.findIndex(i=>i.id==item.id) < 0){
            props.addWorkout(item);
        } else {
            props.delWorkout(item);
        }
    }

    return (
        <Container>
            <HeaderText>Pre-created training series</HeaderText>
            <HeaderText>You have selected {props.myWorkouts.length} training series</HeaderText>

            <WorkoutList
                data={workoutJson}
                renderItem={({item})=><Workout
                data={item}
                addAction={()=>addWorkout(item)}                
                />}

                // renderItem={({item})=><Text>{item.name}</Text>}
                //     data={item}
                //     addAction={()=>addWorkout(item)}
                // />}
                keyExtractor={item=>item.id}
            />



        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {

    let btnNext = 'Ignore';
    if(navigation.state.params && navigation.state.params.myWorkouts.length > 0){
        btnNext = 'Finish';
    }

    const nextAction = () => {
        // if(!navigation.state.params || !navigation.state.params.level){
        //     alert('voce precisa escolher uma opcao')
        //     return
        // }
        // navigation.navigate('StarterRecommendation');
        navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'AppTab'})
            ]
        }));
    }
 
    return {
        title:'',
        headerRight: () => <NextButton title={btnNext} onPress={nextAction} />,

    //     headerRight:<NextButton navigation={navigation} />,
        headerRightContainerStyle:{
        marginRight:10
        }

    }
}


const mapStateToProps = (state) => {
    return {
      myWorkouts:state.userReducer.myWorkouts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setName:(name)=> dispatch({type:'SET_NAME', payload:{name}}),
        // setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS',payload:{workoutDays}})
        // setLevel:(level)=>dispatch({type:'SET_LEVEL',payload:{level}})
        // setName:(name)=> setName(name, dispatch),
        // reset:()=>reset(dispatch)
        addWorkout:(workout)=>dispatch({type:'ADD_WORKOUT',payload:{workout}}),
        delWorkout:(workout)=>dispatch({type:'DEL_WORKOUT',payload:{workout}})
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Page);