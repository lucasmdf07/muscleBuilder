import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const BalloonTriangle = styled.View`
    width:0;
    height:0;
    borderLeftColor:transparent;
    borderLeftWidth:15;
    borderBottomWidth:15;
    borderBottomColor:#A9A9A9;
    borderRightWidth:15;
    borderRightColor:transparent;
`;
const BalloonArea = styled.View`
    width: 90%;
    padding:20px;
    background-color:#A9A9A9;
    border-radius:10px;
`;

const BalloonBigText = styled.Text`
    font-size:15px;
    align-self:center
`;

const ButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
`;
const BalloonText = styled.Text`
    font-size:13px;
    align-self: center;
    margin-top:10px;
`;

const Strong= styled.Text`
    font-weight:bold;
`;

export default (props) => {

    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let thisDate = new Date(today.getFullYear(), props.selectedMonth, props.selectedDay);

    let thisYear = thisDate.getFullYear();
    let thisMonth = thisDate.getMonth() + 1;
    let thisDay = thisDate.getDate();
    thisMonth = (thisMonth < 10)?'0'+thisMonth:thisMonth;
    thisDay = (thisDay < 10)?'0'+thisDay:thisDay;
    let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

    let dayOff = false;
    let isToday = false;
    let isFuture = false;
    let isDone = false;

    if(props.workoutDays.includes(thisDate.getDay())) {
        dayOff = true;
    } else if(thisDate.getTime() > today.getTime()) {
        isFuture = true;
    } else {
        if(props.dailyProgress.includes(dFormated)) {
            isDone = true;
        } else {
            isDone = false;
        }    
    }

    if(thisDate.getTime() == today.getTime()) {
        isToday = true;
    }

    const setDone = () => {
        props.addProgress( dFormated );
    }

    const setUnDone = () => {
        props.delProgress( dFormated );
    }

    return (
        <>
            <BalloonTriangle>

            </BalloonTriangle>
            <BalloonArea>
                {dayOff &&
                    <BalloonBigText>Rest Day</BalloonBigText>
                }
                {isFuture &&
                    <BalloonBigText>Future Day</BalloonBigText>
                }
                {!dayOff && !isFuture && isDone &&
                    <>
                        <BalloonBigText><Strong>Congrats, you accomplished your training</Strong></BalloonBigText>
                        <DefaultButton onPress={setUnDone} underlayColor="#4AC34E"  bgcolor="#4AC34E" style={{marginTop:20}}>
                            <ButtonText>Unmark it</ButtonText>
                        </DefaultButton>
                    </>
                }
                {!dayOff && !isFuture && !isDone && !isToday &&
                    <>
                        <BalloonBigText><Strong>You slacked you POS!</Strong></BalloonBigText>
                        <DefaultButton onPress={setDone} underlayColor="#4AC34E" bgcolor="#4AC34E" style={{marginTop:20}}>
                            <ButtonText>Mark it as done</ButtonText>
                        </DefaultButton>
                    </>
                }
                {!dayOff && !isFuture && !isDone && isToday &&
                    <>
                        <BalloonBigText><Strong>Hoje tem Treino!</Strong></BalloonBigText>
                        <BalloonText>You have to complete your training</BalloonText>
                        <DefaultButton onPress={props.goToWorkout} underlayColor="#4AC34E" bgcolor="#4AC34E" style={{marginTop:20}}>
                            <ButtonText>Start Training</ButtonText>
                        </DefaultButton>
                    </>
                }

            </BalloonArea>
        </>
    );
}