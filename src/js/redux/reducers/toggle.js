import { UPDATE_TOGGLE_SORT_STATUS } from '../constants/action-types'

export default function toggleSort(state = false, action) {
    switch(action.type) {
        case UPDATE_TOGGLE_SORT_STATUS:
            return !state
        default:
            return state
    }
}