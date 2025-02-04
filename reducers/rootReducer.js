import { combineReducers } from 'redux';

import MenuReducer from './MenuReducer.js';
import orderReducer from './orderReducer.js';

import { legacy_createStore as createStore } from 'redux';



const rootReducer = combineReducers({
    menu: MenuReducer,
    orderReducer : orderReducer

});



export default rootReducer;