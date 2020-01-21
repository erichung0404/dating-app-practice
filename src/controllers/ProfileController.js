import React from 'react'; 
import { connect } from 'react-redux'; 

import Profile from '../components/Profile'; 

function ProfileController(props) {
	const { 
		navigation, 
		pan 
	} = props; 

	const user = {
		name: 'Mandy Banana', 
		age: '18', 
		school: 'UMass'
	}

	return (
		<Profile 
			user={user} 
			navigation={navigation}
			pan={pan}
		/>
	)
}

const mapStateToProps = state => ({
	pan: state.profilePage.pan
})

export default connect(mapStateToProps)(ProfileController); 