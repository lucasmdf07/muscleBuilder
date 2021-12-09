import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import DefaultButton from './DefaultButton';

const BalloonTriangle = styled.View`
  width: 0px;
  height: 0px;
  borderleftcolor: transparent;
  borderleftwidth: 15px;
  borderbottomwidth: 15px;
  borderbottomcolor: #ededed;
  borderrightwidth: 15px;
  borderrightcolor: transparent;
`;
const BalloonArea = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #ededed;
  border-radius: 10px;
  min-height: 150px;
`;
const BalloonBigText = styled.Text`
  flex: 1;
  align-self: center;
`;
const FutureTrainingLogo = styled.Image`
  width: 60px;
  height: 60px;
  align-self: center;
`;
const BalloonText = styled.Text`
  align-self: center;
  font-size: 13px;
  margin-top: 10px;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
const Strong = styled.Text`
  font-weight: bold;
`;

export default (props) => {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  let thisDate = new Date(
    new Date().getFullYear(),
    props.selectedMonth,
    props.selectedDay,
  );

  let thisYear = thisDate.getFullYear();
  let thisMonth = thisDate.getMonth() + 1;
  let thisDay = thisDate.getDate();
  thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;
  thisDay = thisDay < 10 ? '0' + thisDay : thisDay;
  let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

  let dayOff = false;
  let isToday = false;
  let isFuture = false;
  let isDone = false;

  if (!props.workoutDays.includes(thisDate.getDay())) {
    dayOff = true;
  } else if (thisDate.getTime() > today.getTime()) {
    isFuture = true;
  } else {
    if (props.dailyProgress.includes(dFormated)) {
      isDone = true;
    } else {
      isDone = false;
    }
  }

  if (thisDate.getTime() == today.getTime()) {
    isToday = true;
  }

  const setDone = () => {
    props.addProgress(dFormated);
  };

  const setUnDone = () => {
    props.delProgress(dFormated);
  };

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timerFunction = () => {
      let now = Date.now();
      let endToday = new Date();
      endToday.setHours(23);
      endToday.setMinutes(59);
      endToday.setSeconds(59);
      endToday = endToday.getTime();
      let diff = endToday - now;

      let h = Math.floor(diff / (1000 * 60 * 60));
      let m = Math.floor(diff / (1000 * 60) - h * 60);
      let s = Math.floor(diff / 1000 - m * 60 - h * 60 * 60);

      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;

      setTimeLeft(`${h}h ${m}m ${s}s`);
    };

    let timer = setInterval(timerFunction, 1000);
    timerFunction();

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* <BalloonTriangle></BalloonTriangle> */}
      <BalloonArea>
        {dayOff && (
          <BalloonBigText>
            <Strong>Rest Day</Strong>
          </BalloonBigText>
        )}
        {isFuture && (
          <>
            <BalloonBigText>
              <Strong>Future Training Day</Strong>
            </BalloonBigText>
            <FutureTrainingLogo source={require('../assets/flex-biceps.png')} />
          </>
        )}
        {!dayOff && !isFuture && isDone && (
          <>
            <BalloonBigText>
              <Strong>Congrats! You completed your training!</Strong>
            </BalloonBigText>
            <DefaultButton
              onPress={setUnDone}
              underlayColor="#4AC34E"
              bgcolor="#4AC34E"
              style={{marginTop: 20}}>
              <ButtonText>Unmark it</ButtonText>
            </DefaultButton>
          </>
        )}
        {!dayOff && !isFuture && !isDone && !isToday && (
          <>
            <BalloonBigText>
              <Strong>You slacked! You didn't train!</Strong>
            </BalloonBigText>
            <DefaultButton
              onPress={setDone}
              underlayColor="#4AC34E"
              bgcolor="#4AC34E"
              style={{marginTop: 20}}>
              <ButtonText>Mark it as done</ButtonText>
            </DefaultButton>
          </>
        )}
        {!dayOff && !isFuture && !isDone && isToday && (
          <>
            <BalloonBigText>
              <Strong>You're scheduled to train today! 🚀</Strong>
            </BalloonBigText>
            <BalloonText>You have {timeLeft} to train!</BalloonText>
            <DefaultButton
              onPress={props.goToWorkout}
              underlayColor="#4AC34E"
              bgcolor="#4AC34E"
              style={{marginTop: 20}}>
              <ButtonText>Start Training</ButtonText>
            </DefaultButton>
          </>
        )}
      </BalloonArea>
    </>
  );
};
