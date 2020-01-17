// mock db with test data
export default class ProfileModel {
	constructor(server) {
		this.server = server; 
	}

	getProfile(id) {
		return this.server.getProfile(id); 
	}

	getMatchedProfiles(id, n=5) {
		return this.server.getMatchedProfiles(id, n); 
	}

	addProfile(profile) {

	}

	removeProfile(id) {

	}

	updateProfile() {

	}
}