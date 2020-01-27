import React, { useEffect } from 'react'; 
import { connect } from 'react-redux'; 

import Settings from '../components/Settings'; 

import { fetchSettings } from '../actions/settings'; 

import SettingsViewModel from '../viewmodels/settings'; 

const userId = 3; 

function SettingsController(props) {
	const { 
		navigation, 
		slideOut, 
		settings, 
		dispatch
	} = props; 

	useEffect(() => {
		navigation.setParams({slideOut}); 
		dispatch(fetchSettings(userId));
	}, [])

	const data = [
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

	return (
		<Settings data={data} navigation={navigation} />
	)
}

const mapStateToProps = state => ({
	settings: state.settings.settings
}); 

export default connect(mapStateToProps)(SettingsController); 