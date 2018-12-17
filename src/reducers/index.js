import { combineReducers } from "redux";
import info from './reducers_info'

const rootReducer = combineReducers ({
    info
});

//console.log(info);

export default rootReducer;