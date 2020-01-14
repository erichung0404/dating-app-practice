import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import CardViewController from '../../ViewController/CardViewController'; 
import { AppContext } from '../../App'; 

export default function HomeView(props) { 
  const { profiles } = useContext(AppContext); 

  return (
    <View style={{ flex: 1 }}>
      <CardViewController navigation={props.navigation} />
    </View>
  );
}