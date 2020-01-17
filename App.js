import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Platform }  from 'react-native'; 
import { connect } from 'react-redux'; 

import NavigationViewController from './ViewController/NavigationViewController'; 

import { fetchRecommendedProfiles } from './src/actions/profile'; 

const height = Platform.OS === 'ios' ? 20 : 0; 

const userId = 2; 

function App(props) {
  const { 
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height }} />
      {
        loading ?
          <Text style={{ alignSelf: 'center' }}>Loading...</Text> : 
          <NavigationViewController />
      }
    </View>
  )
}

const mapStateToProps = state => {
  return {
    profiles, 
    loading, 
    error, 
    message
  } = state.profile; 
}

export default connect(mapStateToProps)(App); 