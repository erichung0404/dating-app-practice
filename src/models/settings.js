// mock db with test data
export default class SettingsModel {
	constructor(server) {
		this.server = server; 
	}

	getSettings(id) {
		return this.server.getSettings(id); 
	}

	addSettings(Settings) {

	}

	removeSettings(id) {

	}

	updateSettings() {

	}
}