import styled from 'styled-components/native';

export default styled.TouchableHighlight`
    width:${props=>props.width || 'auto'};
    height:${props=>props.height || 'auto'};
    background-color:${props=>props.bgcolor || '#EEE'};
    padding:10px 20px;
    border-radius:100px;
    justify-content:center;
    align-items:center;
    ${props=>props.style || null}
`;