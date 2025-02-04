import { v4 as uuidv4 } from 'uuid';
import initialStateData from './initialState.json' assert { type: 'json' };

const initialState = {
  menu: initialStateData.map(item => ({ ...item, id: uuidv4() })), // Add unique IDs
};

console.log('initialState'+ initialState)

const MenuReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add your case actions here
    default:
      return state;
  }
};

export default MenuReducer;
