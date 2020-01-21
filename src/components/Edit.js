import React from 'react'; 
import { 
	View, 
	Text, 
	StyleSheet
} from 'react-native'; 

import Header from './Header'; 

export default function Edit(props) {
	const { slideOut } = props; 

	return (
		<View style={styles.container}>
			<Header 
				title='Edit'
				done={slideOut} 
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})