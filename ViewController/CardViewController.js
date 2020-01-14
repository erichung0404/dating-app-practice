import React, { useState, useContext } from 'react'; 
import { View, Text, StyleSheet, Animated, Image, PanResponder, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler'; 
 
import { AppContext } from '../App'; 

import CardView from '../View/Home/CardView'; 
import OptionsView from '../View/Home/OptionsView'; 

const styles = StyleSheet.create({
  card_container: { 
    flex: 8, 
    zIndex: 0
  }
})

export default function CardController(props) {
  const [curr, setCurr] = useState(0); 
  const [infoPageEnabled, setInfoPageEnabled] = useState(false); 
  const dragEnabled = !infoPageEnabled; 
  const swipeEnabled = infoPageEnabled; 
  const { profiles } = useContext(AppContext); 

  const { navigation } = props; 

  const pan = new Animated.ValueXY(); 
  const angle = new Animated.Value(0); 
  const opacity = new Animated.Value(1); 
  const next = curr + 1; 
  let swipeDirection = 'central'; 

  const borderRadius = new Animated.Value(10); 
  const width = new Animated.Value(0); 
  const height = new Animated.Value(1);
  const textColor = new Animated.Value(0); 
  const textPosition = new Animated.Value(0); 

  const cardStyle = {
    imageStyle: { 
      borderRadius, 
      width: width.interpolate({
        inputRange: [0, 1], 
        outputRange: ['95%', '100%']
      }), 
      height: height.interpolate({
        inputRange: [0, 1], 
        outputRange: ['80%', '100%']
      })
    }, 
    textStyle: {
      color: textColor.interpolate({
        inputRange: [0, 1], 
        outputRange: ['white', 'black']
      })
    }
  }

  function onGestureEvent({ nativeEvent }) {
    const { translationX, translationY } = nativeEvent; 
    pan.setValue({x: translationX, y: translationY}); 
    if(swipeDirection !== 'right' && pan.x._value > 0) {
      rotate(-40, 500).start(); 
      swipeDirection = 'right'; 
    } else if(swipeDirection !== 'left' && pan.x._value < 0) {
      rotate(40, 500).start(); 
      swipeDirection = 'left'; 
    }
  }

  function onHandlerStateChange({ nativeEvent }) {
    const { state } = nativeEvent; 
    if(state === State.END) {
      if(pan.x._value < -100 || pan.x._value > 100) {
        Animated.sequence([
          fadeOut(0, 500),
          position({x: 0, y: 0}, 0), 
          rotate(0, 0)
        ]).start(() => { 
          opacity.setValue(1); 
          setCurr(next); 
        }); 
      } else {
        spring({x: 0, y: 0}).start();
        rotate(0, 100).start(); 
        swipeDirection = 'center'; 
      }
    }
  }

  function fadeOut(toValue, duration) {
    opacity.setValue(1); 
    return Animated.timing(opacity, {
      toValue: toValue,
      duration: duration, 
    });                        
  }

  function spring(toValue) {
    return Animated.spring(pan, {
      toValue: toValue
    })
  }

  function rotate(toValue, duration) {
    return Animated.timing(angle, {
      toValue: toValue,
      duration: duration
    })
  }

  function position(toValue, duration) {
    return Animated.timing(pan, {
      toValue: toValue, 
      duration: duration
    }); 
  }

  function handleDislike() {
    Animated.sequence([
      Animated.parallel([
        rotate(10, 500), 
        position({x: -300, y: 50} , 500), 
        fadeOut(0, 1000)
      ]), 
      position({x: 0, y: 0}, 0), 
      rotate(0, 100)
    ]).start(() => { 
      setCurr(next); 
    }); 
  }

  function handleLike() {
    Animated.sequence([
      Animated.parallel([ 
        rotate(-10, 500), 
        position({x: 300, y: 50} , 500), 
        fadeOut(0, 1000)
      ]), 
      position({x: 0, y: 0}, 0), 
      rotate(0, 0)
    ]).start(() => { 
      setCurr(next); 
    }); 
  }

  function openInfoScreen() {
    if(infoPageEnabled) return; 

    navigation.setParams({tabBarVisible: false}); 
    borderRadius.setValue(0); 
    width.setValue(1);
    height.setValue(0); 
    textColor.setValue(1); 
    textPosition.setValue(1); 
    setInfoPageEnabled(true); 
  }

  function closeInfoScreen() {
    if(!infoPageEnabled) return; 

    navigation.setParams({tabBarVisible: true}); 
    borderRadius.setValue(10); 
    width.setValue(0);
    height.setValue(1); 
    textColor.setValue(0); 
    textPosition.setValue(0); 
    setInfoPageEnabled(false); 
  }

  const angleConfigs = angle.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '45deg']
  });
  let size = profiles.length; 

  return (
    <View style={{ flex: 1 }}>
      {
        !size || curr === size ? 
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center' }}>Oops, no cards</Text> 
          </View> : 
          <View style={{ flex: 1 }}>
            <PanGestureHandler 
              enabled={dragEnabled} 
              onGestureEvent={onGestureEvent} 
              onHandlerStateChange={onHandlerStateChange}
            >
            <View style={{ flex: 8.5, justifyContent: 'flex-end' }}>
            {
              profiles
                .map((profile, id) => {
                  if(id === curr) {
                    return (
                        <Animated.View 
                          style={{position: 'absolute', opacity, height: '100%', width: '100%', transform: [{translateX: pan.x}, {translateY: pan.y}, {rotate: angleConfigs}], zIndex: 1 }}
                        >
                          <CardView profile={profile} infoPressHandler={openInfoScreen} swipeEnabled={swipeEnabled} style={cardStyle} infoPageEnabled={infoPageEnabled} />
                        </Animated.View>
                    ); 
                  } else if(id === next && !infoPageEnabled) {
                    return (
                      <Animated.View 
                        style={{position: 'absolute', height: '100%', width: '100%'}}
                      >
                        <CardView profile={profile} swipeEnabled={false} style={cardStyle} />
                      </Animated.View>
                    ); 
                  }
                }) 
            }
            {
              infoPageEnabled ? 
              <Animated.View style={{ position: 'absolute', zIndex: 1, alignSelf: 'flex-end' }}>
                <Ionicons
                  name={'ios-arrow-dropdown-circle'}
                  size={60}
                  style={{ color: 'red', paddingRight: '5%', paddingBottom: '20%' }}
                  onPress={closeInfoScreen}
                />
              </Animated.View> : null
            }
            </View>
            </PanGestureHandler>
            <View style={{ flex: 1.5, zIndex: -1 }}>
              <OptionsView dislikeHandler={handleDislike} likeHandler={handleLike} />
            </View>
          </View>
      }
    </View>
  ); 
}