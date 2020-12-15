import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const MonthScroll = styled.ScrollView`

`;

const MonthButton = styled.TouchableHighlight`
    width:${props=>props.width};
    justify-content:center;
    align-items:center;
`;
const MonthItem = styled.View`
    width:90%;
    height:30px;
    background-color:#696969;
    border-radius:15px;
    justify-content:center;
    align-items:center;
`;
const MonthText = styled.Text``;

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const screenWidth = Math.round(Dimensions.get('window').width);
let thirdW = screenWidth / 3;


export default (props) => {

    const MonthRef = useRef();

    return (
        <MonthScroll
            ref={MonthRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
        >
            {months.map((m, k)=>(
                <MonthButton key={k} width={thirdW}>
                    <MonthItem>
                        <MonthText>{m}</MonthText>
                    </MonthItem>

                </MonthButton>
            ))}
        </MonthScroll>
    )
}