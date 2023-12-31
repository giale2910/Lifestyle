import {
  SET_VIEW_FILTER, 
  ADD_FOOD,
  REMOVE_FOOD,
} from '../actions';

import { combineReducers } from 'redux';
import uuid from "react-native-uuid";
const default_image = require("../../assets/default_image.png");
import { food } from '../data/suggestions'


import data from "../data/data.json"

/* Initial food list, could be read from json or database file instead */
const initialState = {
  food: [
    ...food,
  ],
}

/* reducer for viewFilters state */
/*export function foodFilter(state = VIEW_ALL, action){
  switch (action.type){
    case SET_VIEW_FILTER:
      return action.filter
    default: return state
  }
}*/

/* state is an array, for food list only */
export function foodOperate(state = initialState.food, action){
  const {food} = state; 
  switch (action.type){
    case ADD_FOOD:
      const newId = Math.floor(Math.random() * Math.floor(99999999));
      var image;
      if (action.isUpload) image = {uri: action.filePath.uri};
      else image = default_image
      return [
          ...state,
          {
            name: action.name,
            category: action.category,
            image: image,
            id: newId,
          }
        ] 
      
    case REMOVE_FOOD:
      return state.filter((item) =>
          item.id !== action.id
        )
    
    default: 
      return state
  }
}

/* reducer for initial generous state */

/*
export function foodDisplay(state = initialState, action) {
  switch (action.type){
    case SET_VIEW_FILTER:
      return Object.assign({}, state, {
        viewFilters: action.filter
      })

    case ADD_FOOD:
      const {newFood} = action.food;
      const newId = state.food.length() + 1;
      return Object.assign({}, state, {
        food: [
          ...state.food,
          {
            name: newFood.name,
            category: newFood.category,
            id: newId,
          }
        ]
      })

    case REMOVE_FOOD:
      return Object.assign({}, state, {
        food: state.food.filter((item) =>
          item.id !== action.id
        )
      })
    
    default: 
      return state
  }
}
*/

/* make a combination reducer for all sep. type */



