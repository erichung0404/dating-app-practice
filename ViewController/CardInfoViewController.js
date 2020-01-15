import React, { useState, useEffect } from 'react'; 
import { View } from 'react-native'; 

import CardInfoView from '../View/Home/CardInfoView'; 

export default function CardInfoViewController(props) {
	const { 
		profile,
		onPress,
		enabled
	} = props; 

	return (
		<View style={{ 
			position: 'absolute', 
			width: '100%', 
			top: enabled ? '85%' : 'auto', 
			bottom: enabled ? 'auto' : 20, 
			paddingRight: 20, 
			paddingLeft: 20
		 }}
		>
			<CardInfoView 
				profile={profile}
				onPress={onPress}
				enabled={enabled}
			/>
		</View>
	); 
}