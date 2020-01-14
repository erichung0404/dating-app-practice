import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import CardController from './CardController'; 
import { AppContext } from '../App'; 

export default function HomeScreen(props) { 
  const { profiles } = useContext(AppContext); 

  return (
    <View style={{ flex: 1 }}>
      <CardController navigation={props.navigation} />
    </View>
  );
}
