import { UPDATE_ARRAY, UPDATE_TOGGLE_SORT_STATUS } from '../constants/action-types'

export function updateArray(payload) {
    return { type: UPDATE_ARRAY, payload}
}

export function updateToggleSortStatus() {
    return { type: UPDATE_TOGGLE_SORT_STATUS }
}

