import {
  SET_VIEW_FILTER, 
  ADD_EXERCISE,
  REMOVE_EXERCISE,
} from '../actions';

import uuid from "react-native-uuid";
import {exercises} from '../data/suggestions'
const default_image = require("../../assets/default_image.png");
/* Icon credit */
// Icons made by <a href="https://www.flaticon.com/authors/ultimatearm" 
// title="ultimatearm">ultimatearm</a> from <a href="https://www.flaticon.com/" 
// title="Flaticon"> www.flaticon.com</a>


/* Initial food list, could be read from a json or database file instead */
const initialState = {
  exercises: [
    ...exercises,
  ],
}


/* state is an array, for list only */
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
