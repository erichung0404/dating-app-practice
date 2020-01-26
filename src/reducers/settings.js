import {
	SETTINGS_FETCH_BEGIN, 
	SETTINGS_FETCH_SUCCESS, 
	SETTINGS_FETCH_ERROR, 
	SETTINGS_UPDATED
} from '../constants/actionTypes'; 

const initialState = {
	settings: [], 
	error: false, 
	message: '', 
	loading: true
}

export default (state=initialState, action) => {
	switch(action.type) {
		case SETTINGS_FETCH_BEGIN: 
			return {
				...state, 
				loading: true
			}
		case SETTINGS_FETCH_SUCCESS: 
			return {
				...state, 
				...action.payload, 
				loading: false
			}
		case SETTINGS_FETCH_ERROR: 
			return {
				...state, 
				message: action.payload.message, 
				error: true, 
				loading: false
			}
		default: 
			return state; 
	}
}