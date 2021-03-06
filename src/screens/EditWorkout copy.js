import React, { useState }  from 'react';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';
import { connect } from 'react-redux';
import ExerciseItemEdit from '../components/ExerciseItemEdit';
import CustomModal from '../components/CustomModal';
// import uuid from 'uuid/v4';
import uuid from 'uuid-random';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';


const Container = styled.SafeAreaView`
    flex:1;
    padding:20px;
    background-color:#FFFFFF;
`;

const NameInput = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;

const ButtonText = styled.Text`
    color:#FFF;
`;

const ExercisesArea = styled.View`
    flex:1;
    margin-top:20px;
    padding-top:20px;
    border-top-width:1px;
    border-top-color:#CCC;
`;

const ExerciseList = styled.FlatList`
    flex:1;
    padding-top:20px;
`;

const ModalLabel = styled.Text`
    font-size:15px;
    font-weight:bold;
    margin-top:10px;
`;

const ModalMuscles = styled.ScrollView``;

const ModalInput = styled.TextInput`
    width:100%;
    font-size:14px;
    color:#333;
    height:40px;
    border-bottom-width:1px;
    border-bottom-color:#CCC;
`;

const ModalMuscle = styled.TouchableHighlight`
    width:50px;
    height:50px;
    background-color:#EEE;
    border-radius:10px;
    justify-content:center;
    align-items:center;
    margin-right:10px;
    opacity:${props=>props.opacity};
`;

const ModalMuscleImage = styled.Image`
    width:35px;
    height:35px;
`;

const ModalExtra = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    margin-bottom:20px;

`;
const ModalExtraItem = styled.View`
    align-items:center;
`;

const Page = (props) => {

    let workout = (props.navigation.state.params && 
        props.navigation.state.params.workout)?
        props.navigation.state.params.workout:false;


    const [id, setId] = useState(workout?workout.id:'');
    const [name, setName] = useState(workout?workout.name:'');
    const [exercises, setExercises] = useState(workout?workout.exercises:[]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalName, setModalName] = useState('');
    const [modalMuscle, setModalMuscle] = useState('');
    const [modalSets, setModalSets] = useState('');
    const [modalReps, setModalReps] = useState('');
    const [modalLoad, setModalLoad] = useState('');

    useEffect(()=>{
        props.navigation.setParams({
            workout:{id, name, exercises},
            addWorkout:props.addWorkout,
            editWorkout:props.editWorkout
        });
    }, [name, exercises]);

    const editExercise = (exercise) => {
        setModalName(exercise.name);
        setModalMuscle(exercise.muscle);
        setModalId(exercise.sets);
        setModalSets(exercise.reps);
        setModalReps(exercise.reps);
        setModalLoad(exercise.load);
        setModalVisible(true);
    }
    const delExercise = (exercise) => {
        let newExercises = [...exercises];
        newExercises = newExercises.filter(i=>i.id!=exercise.id)
        setExercises(newExercises)
    }
    const modalSave = () => {
        let newExercises = [...exercises];

        if(modalName == '' || modalMuscle == '' || modalSets == '' || modalReps == ''){
            alert('Fill out all fields');
            return;
        }

        if(modalId) {
            let index = newExercises.findIndex(i=>i.id == modalId);
            if(index > -1) {
                newExercises[index].name = modalName;
                newExercises[index].muscle = modalMuscle;
                newExercises[index].sets = modalSets;
                newExercises[index].reps = modalReps;
                newExercises[index].load = modalLoad;
            }
            
            } else {
                let ex = {
                    id:uuid(),
                    name:modalName,
                    muscle:modalMuscle,
                    sets:modalSets,
                    reps:modalReps,
                    load:modalLoad
                };
                newExercises.push(ex)
            }

        setExercises(newExercises);
        setModalVisible(false);
    }
    

    const resetModal = () => {
        setModalId('');
        setModalName('');
        setModalMuscle('');
        setModalSets('');
        setModalReps('');
        setModalLoad('');
    }

    const addExercise = () => {
        resetModal();
        setModalVisible(true);
    }

    return (
        <Container>
            <CustomModal visible = {modalVisible} closeAction={()=>setModalVisible(false)}>
                <ModalLabel>Muscle</ModalLabel>
                <ModalMuscles horizontal={true} showHorizontalScrollIndicator={false}>
                    <ModalMuscle 
                        opacity={modalMuscle=='abs'?1:0.3} 
                        onPress={()=>setModalMuscle('abs')} 
                        underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/abs.png')} />
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='back'?1:0.3} 
                        onPress={()=>setModalMuscle('back')} 
                        underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/back.png')} />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle=='biceps'?1:0.3}
                        onPress={()=>setModalMuscle('biceps')} 
                        underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/biceps.png')} />
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='chest'?1:0.3} 
                        onPress={()=>setModalMuscle('chest')} 
                        underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/chest.png')} />
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='glutes'?1:0.3} 
                        onPress={()=>setModalMuscle('glutes')} 
                        underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/glutes.png')} />
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='legs'?1:0.3} 
                        onPress={()=>setModalMuscle('legs')} 
                        underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/legs.png')} />
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='shoulders'?1:0.3} 
                        onPress={()=>setModalMuscle('shoulders')} 
                        underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/shoulders.png')} />
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='triceps'?1:0.3} 
                        onPress={()=>setModalMuscle('triceps')} 
                        underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/triceps.png')} />
                    </ModalMuscle>


                </ModalMuscles>
                <ModalLabel>Exercise Name</ModalLabel>
                <ModalInput value={modalName} onChangeText={e=>setModalName(e)} />

                <ModalExtra>
                    <ModalExtraItem>
                        <ModalLabel>Series</ModalLabel>
                        <ModalInput keyboardType="numeric" value={modalSets} onChangeText={e=>setModalSets(e)} />
                    </ModalExtraItem>
                    <ModalExtraItem>
                        <ModalLabel>Repetitions</ModalLabel>
                        <ModalInput keyboardType="numeric" value={modalReps} onChangeText={e=>setModalReps(e)} />                        
                    </ModalExtraItem>
                    <ModalExtraItem>
                        <ModalLabel>Load (lb)</ModalLabel>
                        <ModalInput keyboardType="numeric" value={modalLoad} onChangeText={e=>setModalLoad(e)} />
                    </ModalExtraItem>                    
                </ModalExtra>

                <DefaultButton bgcolor="#4AC34E" onPress={modalSave} underlayColor="transparent">
                    <ButtonText>Save</ButtonText>
                </DefaultButton>


            </CustomModal>
            <NameInput
                value={name}
                onChangeText= {e=>setName(e)}
                placeholder="Type the name of your training"
            />
            <ExercisesArea>
                <DefaultButton bgcolor="#4AC34E" onPress={addExercise} underlayColor="transparent">
                    <ButtonText>Add Exercise</ButtonText>
                </DefaultButton>

                <ExerciseList 
                    data={exercises}
                    renderItem={({item})=>
                        <ExerciseItemEdit
                        data={item}
                        editAction={()=>editExercise(item)}    
                        delAction={()=>delExercise(item)}    
                    />
                    }
                    keyExtractor={item=>item.name}
                />

                
            </ExercisesArea>
        </Container>
    );
 }

Page.navigationOptions = ({navigation}) => {
    let isEdit = (navigation.state.params && navigation.state.params.workout.id)?true:false;

    const SaveArea = styled.TouchableHighlight`
        width:30px;
        height:30px;
        justify-content:center;
        align-items:center;
    `;

    const SaveImage = styled.Image`
        width:25px;
        height:25px;
    `; 

    const SaveWorkoutButton = () => {

        const handleSave = () => {
            if(navigation.state.params && navigation.state.params.workout){
                let workout = navigation.state.params.workout;

                if(workout.exercises.length > 0){
                    if(workout.id != ''){
                        navigation.state.params.editWorkout(workout);
                    } else {
                        workout.id = uuid();
                        navigation.state.params.addWorkout(workout);
                    }

                    navigation.goBack();

                }else {
                    alert("You need to have at least 1 exercise.")
                }
            }
        }

        return (
            <SaveArea onPress={handleSave} underlayColor="transparent">
                <SaveImage source={require('../assets/check-black.png')} />
            </SaveArea>
        );
    }
    
    return {
        title:isEdit?'Edit training':'Add training',
        headerRight:<SaveWorkoutButton />,
        headerRightContainerStyle:{
            marginRight:10
            }
        }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addWorkout:(workout)=>dispatch({type:'ADD_WORKOUT', payload:{workout}}),
        editWorkout:(workout)=>dispatch({type:'EDIT_WORKOUT', payload:{workout}}),

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Page);