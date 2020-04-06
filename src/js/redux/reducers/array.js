import { UPDATE_ARRAY } from '../constants/action-types'


export default function array(state = [], action) {
    switch(action.type) {
        case UPDATE_ARRAY: 
            return action.payload
        default:
            return state
    }
}