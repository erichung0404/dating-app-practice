import { 
	CARD_POINTER_UPDATE, 
	CARD_INFO_OPENED, 
	CARD_INFO_CLOSED, 
	PHOTO_UPDATED
} from '../constants/actionTypes'; 

export const updateCurr = dest => {
	return dispatch => {
		dispatch({
			type: PHOTO_UPDATED
		}); 
		dispatch({
			type: CARD_POINTER_UPDATE, 
			payload: {
				curr: dest
			}
		})
	}
}

export const openInfoScreen = animation => {
	const {
		navigation, 
		borderRadius, 
		width, 
		height
	} = animation; 

	navigation.setParams({ tabBarVisible: false }); 
    borderRadius.setValue(0); 
    width.setValue(1);
    height.setValue(0); 

	return {
		type: CARD_INFO_OPENED
	}
}

export const closeInfoScreen = animation => {
	const {
		navigation, 
		borderRadius, 
		width, 
		height
	} = animation; 

	navigation.setParams({ tabBarVisible: true }); 
    borderRadius.setValue(10); 
    width.setValue(0);
    height.setValue(1); 

	return {
		type: CARD_INFO_CLOSED
	}
}