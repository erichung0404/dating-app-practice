import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PhotoNavigator from './PhotoNavigator'; 
import Info from './Info'; 

export default function Card(props) {
  const { profile, infoPressHandler, swipeEnabled, style, infoPageEnabled } = props; 
  const { album } = props.profile;  
 
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: '100%', alignSelf: 'center' }}>
        <PhotoNavigator photos={album} swipeEnabled={swipeEnabled} imageStyle={style.imageStyle} />
        <Info profile={profile} onPress={infoPressHandler} textStyle={style.textStyle} enabled={infoPageEnabled} />
      </View>
    </View>
  ); 
}