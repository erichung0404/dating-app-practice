import React from 'react';
import { View, Text, StyleSheet }  from 'react-native'; 

export default function Loading() {
  return (
  	<View style={styles.container}>
    	<Text style={styles.text}>Loading...</Text>
	</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}, 
	text: {
		alignSelf: 'center'
	}
})