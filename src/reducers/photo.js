import { Animated } from 'react-native'; 

import {
	PHOTO_UPDATED
} from '../constants/actionTypes'; 

const initialState = {
	curr: new Animated.Value(0), 
	prev: new Animated.Value(-1), 
	next: new Animated.Value(1)
}

export default (state=initialState, action) => {
	switch(action.type) {
		case PHOTO_UPDATED: 
			return {
				curr: new Animated.Value(0), 
				prev: new Animated.Value(-1), 
				next: new Animated.Value(1)
			}; 
		default: 
			return state; 
	}
}