import {
  SET_VIEW_FILTER, 
  ADD_EXERCISE,
  ViewFilters,
  REMOVE_EXERCISE,
} from '../actions';

import uuid from "react-native-uuid";

const default_image = require("../../assets/default_image.png");
// Icons made by <a href="https://www.flaticon.com/authors/ultimatearm" 
// title="ultimatearm">ultimatearm</a> from <a href="https://www.flaticon.com/" 
// title="Flaticon"> www.flaticon.com</a>

const {VIEW_ALL} = ViewFilters;

const initialState = {
  viewFilters:  ViewFilters.VIEW_ALL,
  exercises: [
    {
      name: 'Sit-up',
      category: 'Abs',
      image: require("../../assets/exercise/situp.png"),
      id: 1,
    },
    {
      name: 'Sit-down',
      category: 'Relax',
      image: require("../../assets/exercise/relax.png"),
      id: 2,
    },
    {
      name: 'Plank',
      category: 'Abs',
      image: require("../../assets/exercise/plank.png"),
      id: 3,
    },
    {
      name: 'Pull-up',
      category: 'Arms',
      image: require("../../assets/exercise/pullup.png"),
      id: 4,
    },
    {
      name: 'Squat',
      category: 'Legs',
      image: require("../../assets/exercise/squat.png"),
      id: 5,
    },
    {
      name: 'Jump Rope',
      category: 'Overall',
      image: require("../../assets/exercise/jumprope.png"),
      id: 6,
    }
  ],
}

/* reducer for viewFilters state */
export function exerciseFilter(state = VIEW_ALL, action){
  switch (action.type){
    case SET_VIEW_FILTER:
      return action.filter
    default: return state
  }
}

/* state is an array, for food list only */
export function exerciseOperate(state = initialState.exercises, action){
  switch (action.type){
    case ADD_EXERCISE:
      const newId = uuid.v4()//state.length + 1;
      return [
          ...state,
          {
            name: action.name,
            category: action.category,
            image: default_image,
            id: newId,
          }
        ]
    
    
    case REMOVE_EXERCISE:
      return state.filter((item) =>
          item.id !== action.id
        )
    

    default: 
      return state
  }
}