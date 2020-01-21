import React from 'react'; 
import { 
	Platform, 
	View, 
	Text, 
	StyleSheet
} from 'react-native'; 
import { 
	TapGestureHandler, 
	State 
} from 'react-native-gesture-handler'; 

export default function Header(props) {
	const { title, done } = props; 

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}></Text>
				<Text style={styles.title}>{title}</Text>
				<TapGestureHandler 
					onHandlerStateChange={({ nativeEvent }) => {
						if(nativeEvent.state === State.END) done(); 
					}}
				>
					<Text style={styles.exit}>Done</Text>
				</TapGestureHandler>
			</View>
  		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 50, 
		marginTop: Platform.OS === 'ios' ? 20 : 0, 
		shadowColor: 'grey', 
		shadowOpacity: 0.25, 
		shadowOffset: {width: 0, height: 5}, 
		backgroundColor: 'lightgrey'
	}, 
	header: {
		flex: 1, 
		flexDirection: 'row', 
		alignItems: 'center', 
		alignSelf: 'center', 
		height: '100%', 
		width: '90%'
	}, 
	title: {
		flex: 1, 
		textAlign: 'center', 
		fontWeight: 'bold', 
		color: 'black', 
		fontSize: 20
	}, 
	exit: {
		flex: 1, 
		textAlign: 'right', 
		fontWeight: 'bold', 
		color: 'red', 
		fontSize: 18
	}
})