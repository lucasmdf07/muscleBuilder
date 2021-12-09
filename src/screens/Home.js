import React, {useState} from 'react';
// import { Text } from 'react-native';
// import { StackActions, NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll';
import HomeDaysStatus from '../components/HomeDaysStatus';
// import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
  align-items: center;
  background-color: #ffffff;
  flex: 1;
`;

const Legend = styled.View`
  width: 90%;
  align-items: flex-start;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const LegendText = styled.Text`
  color: #555;
`;

const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const LegendBox = styled.View`
  width: 15px;
  height: 15px;
  background-color: #ccc;
  margin-right: 5px;
`;

const Page = (props) => {
  let today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  return (
    <Container>
      <HomeMonthScroll
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <HomeDaysScroll
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={props.dailyProgress}
        workoutDays={props.workoutDays}
      />
      <HomeDaysStatus
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={props.dailyProgress}
        workoutDays={props.workoutDays}
        addProgress={props.addProgress}
        delProgress={props.delProgress}
        goToWorkout={() => props.navigation.navigate('WorkoutStack')}
      />
      <LegendText>Month: {selectedMonth}</LegendText>
      <LegendText>Day: {selectedDay}</LegendText>

      <Legend>
        <LegendText>Color Code:</LegendText>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#B5EEFF'}}></LegendBox>
          <LegendText>Today</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#B5FFB8'}}></LegendBox>
          <LegendText>Training completed</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#FFB5B5'}}></LegendBox>
          <LegendText>Training missed</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBox
            style={{backgroundColor: '#F4F4F4', opacity: 0.2}}></LegendBox>
          <LegendText>Rest day</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#F4F4F4'}}></LegendBox>
          <LegendText>Upcoming days</LegendText>
        </LegendItem>
      </Legend>
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  const ConfigButtonArea = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  `;

  const ConfigButtonImage = styled.Image`
    width: 25px;
    height: 25px;
  `;

  const ConfigButton = () => {
    const btnAction = () => {
      navigation.navigate('HomeConfig');
    };
    return (
      <ConfigButtonArea onPress={btnAction} underlayColor="transparent">
        <ConfigButtonImage source={require('../assets/config.png')} />
      </ConfigButtonArea>
    );
  };

  return {
    title: 'Your daily Progress',
    headerRight: () => <ConfigButton />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = (state) => {
  return {
    //   myWorkouts:state.userReducer.myWorkouts
    dailyProgress: state.userReducer.dailyProgress,
    workoutDays: state.userReducer.workoutDays,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProgress: (date) => dispatch({type: 'ADD_PROGRESS', payload: {date}}),
    delProgress: (date) => dispatch({type: 'DEL_PROGRESS', payload: {date}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
