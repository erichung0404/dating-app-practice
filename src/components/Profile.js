import React from 'react'; 
import { 
	View, 
	Text, 
	Image,
	StyleSheet, 
	Dimensions, 
	Animated
} from 'react-native'; 
import { TapGestureHandler, State } from 'react-native-gesture-handler'; 
import { Ionicons } from '@expo/vector-icons';

import Settings from './Settings'; 
import Gallery from './Gallery'; 
import Edit from './Edit'; 

const { height, width } = Dimensions.get('window'); 

export default function Profile(props) {
	const { 
		user, 
		navigation, 
		pan 
	} = props; 

  	return (
	    <View style={styles.container}>
	    	<View style={styles.settings_background}>
				<View style={styles.settings_container}>
					<Image 
						source={require('../../assets/images.jpeg')}
						style={styles.image}
					/>
					<Text style={styles.title}>
						{user.name}, {user.age}
					</Text>
					<Text style={styles.subtitle}>
						{user.school}
					</Text>
					<View style={styles.function_container}> 
						<View style={styles.button_container}>
							<TapGestureHandler
								onHandlerStateChange={({ nativeEvent }) => {
									if(nativeEvent.state === State.END) slideIn(0); 
								}}
							>
								<View style={styles.icon_container}>
									<Ionicons 
										name={'md-settings'}
										size={30}
										style={styles.icon}
									/>
								</View>
							</TapGestureHandler>
							<Text style={styles.text}>Settings</Text>
						</View>
						<View style={styles.button_container}>
							<TapGestureHandler
								onHandlerStateChange={({ nativeEvent }) => {
									if(nativeEvent.state === State.END) slideIn(1); 
								}}
							>
								<View style={{
									...styles.icon_container, 
									...styles.iccon_container_camera
									}}
								>
									<Ionicons 
										name={'md-camera'}
										size={50}
										style={styles.icon_camera}
									/>
								</View>
							</TapGestureHandler>
							<Text style={styles.text}>Add Photo</Text>
						</View>
						<View style={styles.button_container}>
							<TapGestureHandler
								onHandlerStateChange={({ nativeEvent }) => {
									if(nativeEvent.state === State.END) slideIn(2); 
								}}
							>
								<View style={styles.icon_container}>
									<Ionicons 
										name={'md-create'}
										size={30}
										style={styles.icon}
									/>
								</View>
							</TapGestureHandler>
							<Text style={styles.text}>Edit</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.ads_container}>
				<Text style={styles.title}>Animated Ads</Text>
			</View>
			<Animated.View 
				style={{
					position: 'absolute', 
					width: '100%', 
					height: '100%', 
					backgroundColor: 'lightgrey', 
					transform: [
						{translateX: pan[0].x}, 
						{translateY: pan[0].y}
					]
				}}
			>
				<Settings 
					slideOut={() => slideOut(0)}
				/>
			</Animated.View>
			<Animated.View 
				style={{
					position: 'absolute', 
					width: '100%', 
					height: '100%', 
					backgroundColor: 'lightgrey', 
					transform: [
						{translateX: pan[1].x}, 
						{translateY: pan[1].y}
					]
				}}
			>
				<Gallery
					slideOut={() => slideOut(1)}
				/>
			</Animated.View>
			<Animated.View 
				style={{
					position: 'absolute', 
					width: '100%', 
					height: '100%', 
					backgroundColor: 'lightgrey', 
					transform: [
						{translateX: pan[2].x}, 
						{translateY: pan[2].y}
					]
				}}
			>
				<Edit
					slideOut={() => slideOut(2)}
				/>
			</Animated.View>
	    </View>
	)

	function slideIn(id) {
		navigation.setParams({swipeEnabled: false, tabBarVisible: false}); 
		Animated.spring(pan[id], {
			toValue: {x: 0, y: 0}, 
			bounciness: 0
		}).start(); 
	}

	function slideOut(id) {
		navigation.setParams({swipeEnabled: true, tabBarVisible: true}); 
		Animated.timing(pan[id], {
			toValue: {x: 0, y: height}, 
			duration: 500
		}).start(); 
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: 'lightgray', 
		alignItems: 'center'
	}, 
	settings_background: {
		alignItems: 'center', 
		width: '170%', 
		height: '70%', 
		backgroundColor: 'white', 
		shadowOpacity: 0.25, 
		shadowColor: 'grey', 
		shadowOffset: { width: 0, height: 10 }, 
		borderBottomLeftRadius: 300, 
		borderBottomRightRadius: 300
	}, 
	settings_container: {
		alignItems: 'center', 
		width, 
		height: '100%'
	}, 
	title: {
		color: 'black', 
		fontWeight: 'bold', 
		fontSize: 28, 
		marginTop: 10
	}, 
	subtitle: {
		marginTop: 10
	}, 
	image: {
		width: 150, 
		height: 150, 
		borderRadius: 75, 
		marginTop: 30
	}, 
	function_container: {
		flex: 1, 
		flexDirection: 'row', 
		marginTop: 20
	}, 
	button_container: {
		flex: 1, 
		alignItems: 'center'
	}, 
	icon_container: {
		justifyContent: 'center', 
		alignItems: 'center', 
		width: 50, 
		height: 50, 
		borderRadius: 25, 
		backgroundColor: 'white', 
		shadowOpacity: 0.25, 
		shadowColor: 'black', 
		shadowOffset: { width: 0, height: 2 }, 
		shadowRadius: 5
	}, 
	icon: {
		textAlign: 'center', 
		width: 30, 
		height: 30, 
		color: 'lightgrey'
	}, 
	iccon_container_camera: {
		width: 70, 
		height: 70, 
		marginTop: 30, 
		borderRadius: 35, 
		backgroundColor: 'red'
	}, 
	icon_camera: {
		textAlign: 'center', 
		width: 50, 
		height: 50, 
		color: 'white'
	}, 
	text: {
		marginTop: 8, 
		color: 'lightgrey'
	}, 
	ads_container: {
		flex: 1, 
		justifyContent: 'center'
	}
}); 