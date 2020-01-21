import { combineReducers } from 'redux'; 

import profile from './reducers/profile'; 
import card from './reducers/card'; 
import photo from './reducers/photo'; 
import profilePage from './reducers/profilePage'; 

export default combineReducers({
	profile, 
	card, 
	photo, 
	profilePage
})