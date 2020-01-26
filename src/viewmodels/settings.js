import { server } from '../constants/testData'; 

import SettingsModel from '../models/settings'; 

class SettingsViewModel {
	constructor(store) {
		this.store = store; 
	}

	getSettings(id) {
		return this.store.getSettings(id); 
	}

	addSettings(Settings) {
		this.store.addSettings(Settings); 
	}

	removeSettings(id) {
		this.store.removeSettings(id); 
	}
}

const store = new SettingsModel(server); 

export default new SettingsViewModel(store); 