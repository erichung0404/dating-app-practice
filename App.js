import React from 'react';
import { View, StatusBar } from 'react-native'; 

import NavigationController from './src/controllers/NavigationController'; 

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar 
          barStyle = "dark-content" 
          hidden = {false} 
          backgroundColor = "#00BCD4" 
          translucent = {true}
      />
      <NavigationController />
    </View>
  )
}