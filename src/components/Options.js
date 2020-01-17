import React from 'react'; 
import { View } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';

export default function Options(props) {
  const { dislikeHandler, likeHandler } = props; 
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Ionicons
          name={'ios-close-circle-outline'}
          size={80}
          style={{ color: 'red' }}
          onPress={dislikeHandler}
        />
        <Ionicons
          name={'ios-checkmark-circle-outline'}
          size={80}
          style={{ color: 'green' }}
          onPress={likeHandler}
        />
      </View>
    </View>
  )
}