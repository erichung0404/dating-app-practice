import { combineReducers } from 'redux'; 

import profile from './reducers/profile'; 
import card from './reducers/card'; 
import photo from './reducers/photo'; 

export default combineReducers({
	profile, 
	card, 
	photo
})