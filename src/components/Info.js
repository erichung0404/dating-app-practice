import React from 'react'; 
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 

export default function Info(props) {
  const { profile, onPress, enabled } = props; 

  return (
    <View style={{ 
      position: 'absolute', 
      width: '100%', 
      top: enabled ? '85%' : 'auto', 
      bottom: enabled ? 'auto' : 20, 
      paddingRight: 20, 
      paddingLeft: 20
     }}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            {
              Object.keys(profile).map((item, id) => {
                return <Text style={{color: enabled?'black':'white'}}>{profile[item]}</Text>
              })
            }
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Ionicons name={'ios-information-circle'} size={30} color='white' />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  ); 
}