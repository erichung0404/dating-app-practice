import React from 'react'; 
import { 
	Animated, 
	Dimensions
} from 'react-native'; 
import {
	TapGestureHandler, 
	State
} from 'react-native-gesture-handler'; 

const { width, height } = Dimensions.get('screen'); 

export default function SlideIn(props) {
	const {
		pan, 
		children, 
		slideInComponent
	} = props; 

	return (
		<TapGestureHandler
			onGestureEvent={onGestureEvent}
		>
		{
			React.Children.forEach(children, child => React.cloneElement(child))
		}
		</TapGestureHandler>
		<Animated.View
			style={{
				position: 'absolute', 
				width: '100%', 
				height: '100%', 
				backgroundColor: 'lightgray', 
				transform: [
					{translationX: pan.x}, 
					{translationY: pan.y}
				]
			}}
		>
		{ slideInComponent }
		</Animated.View>
	)

	function onGestureEvent({ nativeEvent }) {
		const { state } = nativeEvent; 

		if(state === State.END) slideIn(); 
	}

	function slideIn() {
		Animated.spring(pan, {
			toValue: {x: 0, y: 0}, 
			bounciness: 0
		}).start(); 
	}
}