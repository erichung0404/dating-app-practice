import { Animated } from 'react-native'; 

const initialState = {
	curr: new Animated.Value(0), 
	prev: new Animated.Value(0), 
	next: new Animated.Value(1)
}

export default (state=initialState, action) => {
	switch(action.type) {
		default: 
			return state; 
	}
}