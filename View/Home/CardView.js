import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PhotoViewController from '../../ViewController/PhotoViewController'; 
import CardInfoViewController from '../../ViewController/CardInfoViewController'; 

export default function CardView(props) {
  const { profile, infoPressHandler, swipeEnabled, style, infoPageEnabled } = props; 
  const { album } = props.profile;  
 
  return (
    <View style={{ flex: 1, alignContent: 'center' }}>
      {
      	<PhotoViewController photos={album} swipeEnabled={swipeEnabled} imageStyle={style.imageStyle} />
      }
      <CardInfoViewController profile={profile} onPress={infoPressHandler} enabled={infoPageEnabled} />
    </View>
  ); 
}