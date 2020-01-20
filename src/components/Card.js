import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PhotoController from '../controllers//PhotoController'; 
import Info from './Info'; 

export default function Card(props) {
  const { 
    top, 
  	profile, 
  	infoPressHandler, 
  	swipeEnabled, 
  	style, 
  	infoPageEnabled 
  } = props; 
  const { album } = profile;  
 
  return (
    <View style={styles.container}>
  		<PhotoController 
        top={top}
  			photos={album} 
  			swipeEnabled={swipeEnabled} 
  			imageStyle={style.imageStyle} 
  		/>
    		<Info 
    			profile={profile} 
    			onPress={infoPressHandler} 
    			enabled={infoPageEnabled} 
  		/>
    </View>
  ); 
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		alignContent: 'center'
	}
})