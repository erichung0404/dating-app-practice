import React from 'react'; 
import { View, Text } from 'react-native'; 

export default function MessengerView(props) {
  return (
    <View style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Test Page</Text>
    </View>
  )
}