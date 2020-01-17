import { combineReducers } from 'redux'; 

import profile from './reducers/profile'; 
import card from './reducers/card'; 

export default combineReducers({
	profile, 
	card
})