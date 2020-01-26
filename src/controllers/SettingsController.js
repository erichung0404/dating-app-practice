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

	return (
		<Settings data={settings} navigation={navigation} />
	)
}

const mapStateToProps = state => ({
	settings: state.settings.settings
}); 

export default connect(mapStateToProps)(SettingsController); 