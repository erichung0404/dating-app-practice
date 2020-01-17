import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'; 

import CardViewController from '../../ViewController/CardViewController'; 

export default function HomeView(props) { 
  return (
    <View style={{ flex: 1 }}>
      <CardViewController navigation={props.navigation} />
    </View>
  );
}