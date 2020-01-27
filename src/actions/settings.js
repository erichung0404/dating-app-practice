import {
	SETTINGS_FETCH_BEGIN, 
	SETTINGS_FETCH_SUCCESS, 
	SETTINGS_FETCH_ERROR, 
	SETTINGS_UPDATED
} from '../constants/actionTypes'; 

import SettingsViewModel from '../viewmodels/settings'; 

export const fetchSettings = userId => {
	return dispatch => {
		dispatch({type: SETTINGS_FETCH_BEGIN}); 
		return SettingsViewModel
				.getSettings(userId)
				.then(settings => {
					dispatch({
						type: SETTINGS_FETCH_SUCCESS, 
						payload: {
							settings
						}
					}); 
				})
				.catch(error => {
					dispatch({
						type: SETTINGS_FETCH_ERROR, 
						payload: {
							message: error.message
						}
					})
				})
	}
}