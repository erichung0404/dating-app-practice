import React from 'react'; 
import { registerRootComponent } from 'expo'; 
import { Provider } from 'react-redux'; 

import App from './App';
import { store } from './src/store'; 

function rnApp() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}

export default registerRootComponent(rnApp);