import { 
	PROFILE_FETCH_BEGIN, 
	PROFILE_FETCH_SUCCESS, 
	PROFILE_FETCH_ERROR
} from '../constants/actionTypes'; 

const initialState = {
	profiles: [], 
	loading: true, 
	error: null
}

export default (state=initialState, action) => {
	switch(action.type) {
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
				error: action.payload.message
			}
		case PROFILE_FETCH_BEGIN: 
		default: 
			return state; 
	}
}