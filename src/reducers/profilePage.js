import { Animated, Dimensions } from 'react-native'; 

const { height } = Dimensions.get('screen'); 

const initialState = {
	pan: [
		new Animated.ValueXY({x: 0, y: height}), 
		new Animated.ValueXY({x: 0, y: height}), 
		new Animated.ValueXY({x: 0, y: height})
	]
}

export default (state=initialState, action) => {
	switch(action.type) { 
		default: 
			return state; 
	}
}