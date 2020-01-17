import { server } from '../constants/testData'; 

import ProfileModel from '../models/profile'; 

class ProfileViewModel {
	constructor(store) {
		this.store = store; 
	}

	getProfile(id) {
		return this.store.getProfile(id); 
	}

	getMatchedProfiles(id) {
		return this.store.getMatchedProfiles(id); 
	}

	addProfile(profile) {
		this.store.addProfile(profile); 
	}

	removeProfile(id) {
		this.store.removeProfile(id); 
	}
}

const store = new ProfileModel(server); 

export default new ProfileViewModel(store); 