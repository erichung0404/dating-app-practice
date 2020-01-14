import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 

export default function CardInfoView(props) {
  const [enabled, setEnabled] = useState(false); 
  const { profile, onPress, textStyle } = props; 

  useEffect(() => {
    setEnabled(props.enabled); 
  }, [props.enabled])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ position: enabled ? 'relative' : 'absolute', width: '100%', bottom: 0, zIndex: 1 }}>
        <View style={{ flex: 1, paddingLeft: 20, paddingBottom: 10, paddingRight: 20 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            {
              Object.keys(profile).map((item, id) => {
                return <Animated.Text style={textStyle}>{profile[item]}</Animated.Text>
              })
            }
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Ionicons name={'ios-information-circle'} size={30} color='white' />
            </View>
          </View>
        </View> 
      </View>
    </TouchableWithoutFeedback>
  ); 
}