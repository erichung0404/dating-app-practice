import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'; 

import { fetchRecommendedProfiles } from '../actions/profile'; 

import Loading from '../components/Loading'; 
import Home from '../components/Home'; 

const userId = 2; 

function HomeController(props) { 
	const { 
		navigation, 
		profiles, 
		loading, 
		error, 
		message, 
		dispatch 
	} = props; 

	useEffect(() => {
		dispatch(fetchRecommendedProfiles(userId)); 
		if(error) alert(message)
	}, [])

	return loading ? 
			<Loading /> : 
			<Home navigation={navigation} />
}

const mapStateToProps = state => {
  return {
    profiles, 
    loading, 
    error, 
    message
  } = state.profile; 
}

export default connect(mapStateToProps)(HomeController); 