import { combineReducers } from "redux";
import array from './array'
import toggleSort from './toggle'

const rootReducer = combineReducers({
    array,
    toggleSort
})

export default rootReducer