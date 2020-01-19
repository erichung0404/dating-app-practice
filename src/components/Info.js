import React from 'react'; 
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 

export default function Info(props) {
  const { 
    profile, 
    onPress, 
    enabled 
  } = props; 

  return (
    <View 
      style={{
        ...styles.container, 
        top: enabled ? '85%' : 'auto', 
        bottom: enabled ? 'auto' : 20
      }}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.info_container}>
          <View style={styles.text_container}>
          {
            Object.keys(profile).map((item, id) => {
              return (
                <Text style={{color: enabled ? 'black' : 'white'}}>
                  {profile[item]}
                </Text>
              ); 
            })
          }
          </View>
          <View style={styles.icon_container}>
            <Ionicons 
              name={'ios-information-circle'} 
              size={30} 
              color='white' 
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    width: '100%', 
    paddingRight: 20, 
    paddingLeft: 20
  }, 
  info_container: {
    flex: 1, 
    flexDirection: 'row'
  }, 
  text_container: {
    flex: 1, 
    justifyContent: 'flex-end'
  }, 
  icon_container: {
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'flex-end'
  }
}); 