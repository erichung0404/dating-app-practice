import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PhotoController from '../controllers//PhotoController'; 
import Info from './Info'; 

export default function Card(props) {
  const { profile, infoPressHandler, swipeEnabled, style, infoPageEnabled } = props; 
  const { album } = profile;  
 
  return (
    <View style={{ flex: 1, alignContent: 'center' }}>
    	<PhotoController photos={album} swipeEnabled={swipeEnabled} imageStyle={style.imageStyle} />
      <Info profile={profile} onPress={infoPressHandler} enabled={infoPageEnabled} />
    </View>
  ); 
}