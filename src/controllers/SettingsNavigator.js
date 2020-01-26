import React from 'react'; 

import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack'; 

import SettingsController from './SettingsController'; 

import Header from '../components/Header'; 
import Phone from '../components//Phone'; 
import Email from '../components//Email'; 
import Location from '../components//Location'; 
import ShowMe from '../components//ShowMe'; 
import Notification from '../components//Notification'; 

export default createAppContainer(createStackNavigator({
	Settings: { 
		screen: ({ navigation, screenProps }) => <SettingsController navigation={navigation} slideOut={screenProps.slideOut} />, 
		navigationOptions: ({ navigation }) => ({
			headerRight: () => <Header done={navigation.state.params ? navigation.state.params.slideOut : null} />, 
			headerTitleStyle: { fontSize: 20 }
		})
	}, 
	Phone: {screen: Phone}, 
	Email: {screen: Email}, 
	Location: {screen: Location}, 
	'Show Me': {screen: ShowMe}, 
	'Push Notification': {screen: Notification}
}, {
	initialRoute: 'Settings', 
}))