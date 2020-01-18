import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native'; 

import NavigationController from './src/controllers/NavigationController'; 

export default function App() {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})