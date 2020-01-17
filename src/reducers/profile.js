import { 
	PROFILE_FETCH_BEGIN, 
	PROFILE_FETCH_SUCCESS, 
	PROFILE_FETCH_ERROR
} from '../constants/actionTypes'; 

const initialState = {
	profiles: [], 
	loading: true, 
	message: '', 
	error: false
}

export default (state=initialState, action) => {
	switch(action.type) {
		case PROFILE_FETCH_BEGIN: 
			return {
				...state, 
				profiles: [], 
				loading: true, 
				message: '', 
				error: false
			}
		case PROFILE_FETCH_SUCCESS: 
			return {
				...state, 
				profiles: action.payload.profiles, 
				loading: false
			}
		case PROFILE_FETCH_ERROR: 
			return {
				...state, 
				loading: false, 
				message: action.payload.message, 
				error: true
			}
		default: 
			return state; 
	}
}