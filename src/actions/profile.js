import { 
	PROFILE_FETCH_BEGIN, 
	PROFILE_FETCH_SUCCESS, 
	PROFILE_FETCH_ERROR
} from '../constants/actionTypes'; 

import ProfileViewModel from '../viewmodels/profile'; 

export const fetchRecommendedProfiles = (userId) => {
	return dispatch => {
		dispatch({ type: PROFILE_FETCH_BEGIN }); 
		return ProfileViewModel
				.getMatchedProfiles(userId)
				.then(profiles => {
					dispatch({
						type: PROFILE_FETCH_SUCCESS, 
						payload: {
							profiles
						}
					})
				})
				.catch(error => {
					dispatch({
						type: PROFILE_FETCH_ERROR, 
						payload: {
							message: error.message
						}
					})
				})
	}
}