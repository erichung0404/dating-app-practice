import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import CardController from '../controllers/CardController'; 

export default function Home(props) { 
	const { navigation } = props; 

	return (
		<View style={styles.container}>
			<CardController navigation={navigation} />
		</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})