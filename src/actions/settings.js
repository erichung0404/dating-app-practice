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
							settings: [
								{
									title: 'ACCOUNT', 
									data: [
										{
											title: 'Phone', 
											data: settings['Phone']
										}, 
										{
											title: 'Email', 
											data: settings['Email']
										}
									]
								}, 
								{
									title: 'DISCOVERY', 
									data: [
										{
											title: 'Location', 
											data: settings['Location']
										}, 
										{
											title: 'Max Distance', 
											data: settings['Max Distance']
										}, 
										{
											title: 'Show Me', 
											data: settings['Show Me']
										}, 
										{
											title: 'Age', 
											data: settings['Age']
										}
									]
								}, 
								{
									title: '', 
									data: [
										{
											title: 'Show Me on App', 
											data: settings['Show Me on App']
										}
									]
								}, 
								{
									title: 'Notification', 
									data: [
										{
											title: 'Push Notification', 
											data: settings['Push Notification']
										}
									]
								}
							]
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