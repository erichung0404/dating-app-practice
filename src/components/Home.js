import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import DeckController from '../controllers/DeckController'; 

export default function Home(props) { 
	const { navigation } = props; 

	return (
		<View style={styles.container}>
			<DeckController navigation={navigation} />
		</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})