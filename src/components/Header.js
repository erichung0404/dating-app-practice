import React from 'react'; 
import { 
	Platform, 
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity
} from 'react-native'; 

export default function Header(props) {
	const { done } = props; 

	return (
		<TouchableOpacity onPress={done}>
			<Text style={styles.exit}>Done</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	exit: {
		fontSize: 18, 
		// fontWeight: 'bold', 
		color: 'red', 
		paddingRight: 20
	}
})