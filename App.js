import React, { useState, useEffect } from 'react';
import { View, Text, Alert }  from 'react-native'; 
import { Platform } from 'react-native'; 

import MainNavigator from './components/MainNavigator'; 

import { db } from './testData'; 

export const AppContext = React.createContext({}); 

const height = Platform.OS === 'ios' ? 20 : 0; 

export default function App() {
  const [fetchProfiles, setFetchProfiles] = useState({
    profiles: [], 
    inProgress: true
  });

  useEffect(() => {
    queryDB(db)
      .then(data => setFetchProfiles({ profiles: data, inProgress: false }))
      .catch(error => Alert.alert(error.message)); 
  }, [])

  function queryDB(db) { 
    // simulate asynchronous db query
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(db.profiles !== undefined) {
          resolve(db.profiles); 
        } else {
          reject(new Error('empty profiles')); 
        }
      }, 2000); 
    }); 
  }

  const { profiles, inProgress } = fetchProfiles; 
  
  return (
    <AppContext.Provider value={{ profiles }}>
      <View style={{ height }} />
      {
        inProgress ?
          <Text style={{ alignSelf: 'center' }}>Loading...</Text> : 
          <MainNavigator />
      }
    </AppContext.Provider>
  )
}