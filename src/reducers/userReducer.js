import {ERROR, LOADING, SIGN_IN, SIGN_UP, LOGOUT, SUCCESS} from './types';

const initialState = {
  name: '',
  level: '', // beginner, intermediate, advanced
  workoutDays: [], // 0-6 (Semana comeca no domingo)
  myWorkouts: [],
  lastWorkout: '', // ID
  dailyProgress: ['2021-02-02', '2021-02-01', '2021-02-26'],
  loading: false,
  loggedIn: false,
  success: false,
  error: undefined,
};

export default (state = initialState, action) => {
  let myWorkouts = [...state.myWorkouts];
  let dailyProgress = [...state.dailyProgress];

  switch (action.type) {
    case 'SET_NAME':
      return {...state, name: action.payload.name};
    case 'SET_WORKOUTDAYS':
      return {...state, workoutDays: action.payload.workoutDays};
    case 'SET_LEVEL':
      return {...state, level: action.payload.level};
    case 'SET_LASTWORKOUT':
      return {...state, lastWorkout: action.payload.id};
    case 'ADD_WORKOUT':
      if (myWorkouts.findIndex((i) => i.id == action.payload.workout.id) < 0) {
        myWorkouts.push(action.payload.workout);
      }
      return {...state, myWorkouts};
    case 'EDIT_WORKOUT':
      let index = myWorkouts.findIndex(
        (i) => i.id === action.payload.workout.id,
      );
      if (index > -1) {
        myWorkouts[index] = action.payload.workout;
      }
      return {...state, myWorkouts};
    case 'DEL_WORKOUT':
      myWorkouts = myWorkouts.filter((i) => i.id !== action.payload.workout.id);
      return {...state, myWorkouts};
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SIGN_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case SIGN_UP:
      return {
        ...state,
        success: action.show,
        loggedIn: true,
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    case SUCCESS:
      return {
        ...state,
        success: action.show,
      };
    case 'ADD_PROGRESS':
      if (!dailyProgress.includes(action.payload.date)) {
        dailyProgress.push(action.payload.date);
      }
      return {...state, dailyProgress};
    case 'DEL_PROGRESS':
      dailyProgress = dailyProgress.filter((i) => i !== action.payload.date);
      return {...state, dailyProgress};
    case 'RESET':
      return {...state, ...initialState};
  }

  return state;
};
