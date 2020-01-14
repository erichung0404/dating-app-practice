import React, { useState } from 'react'; 
import { View, Animated, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'; 
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window'); 

export default function Swipeable(props) {
  const [curr, setCurr] = useState(0); 
  const { photos } = props; 

  let right = curr + (curr === photos.length-1 ? 0 : 1); 
  let left = curr - (curr === 0 ? 0 : 1); 

  const currX = new Animated.Value(0); 
  const rightX = new Animated.Value(width); 
  const leftX = new Animated.Value(-width); 

  function renderRight() {
      Animated.parallel([
      Animated.spring(currX, {
        toValue: -width, 
        duration: 500, 
        bounciness: 0
      }), 
      Animated.spring(rightX, {
        toValue: 0, 
        duration: 500, 
        bounciness: 0
      }), 
    ]).start(() => setCurr(right)); 
  }

  function renderLeft() {
      Animated.parallel([
      Animated.spring(currX, {
        toValue: width, 
        duration: 500, 
        bounciness: 0
      }), 
      Animated.spring(leftX, {
        toValue: 0, 
        duration: 500, 
        bounciness: 0
      }), 
    ]).start(() => setCurr(left)); 
  }

  function resetLeft() {
    Animated.parallel([
      Animated.spring(currX, {
        toValue: 0, 
        duration: 500
      }), 
      Animated.spring(leftX, {
        toValue: -width, 
        duration: 500
      })
    ]).start(); 
  }

  function resetRight() {
    Animated.parallel([
      Animated.spring(currX, {
        toValue: 0, 
        duration: 500
      }), 
      Animated.spring(rightX, {
        toValue: width, 
        duration: 500
      })
    ]).start(); 
  }

  return (
    <PanGestureHandler 
      onGestureEvent = {({ nativeEvent }) => {
        const { translationX } = nativeEvent; 
        if(curr > 0 && translationX > 0) {
          currX.setValue(translationX); 
          leftX.setValue(translationX + (translationX > 0 ? -width : translationX < 0 ? width : 0));
        } else if(curr < photos.length-1 && translationX < 0) {
          currX.setValue(translationX); 
          rightX.setValue(translationX + (translationX > 0 ? -width : translationX < 0 ? width : 0));
        }
      }} 
      onHandlerStateChange = {({ nativeEvent }) => {
        const { translationX, velocityX, state } = nativeEvent; 
        const velocityX_abs = Math.abs(velocityX); 
        const halfScreen = width/2; 
        if(state === State.END) {
          if(Math.abs(translationX) > halfScreen || velocityX_abs > 1000) {
            if(curr > 0 && translationX > 0) renderLeft(); 
            else if(curr < photos.length-1 && translationX < 0) renderRight(); 
          } else {
            if(curr > 0 && translationX > 0) resetLeft(); 
            else if(curr < photos.length-1 && translationX < 0) resetRight(); 
          }
        }}
      }
    >
      <View style={{ flex: 1 }}>      
      {
        photos.map((photo, id) => {
          if(id === curr) {
            return (
              <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', transform: [{translateX: currX}] }}>
                <Image 
                  source={photos[curr]} 
                  style={{ width: '100%', height: '100%' }}
                />
              </Animated.View>
            )
          } else if(id === left) {
            return (
              <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', transform: [{translateX: leftX}] }}>
                <Image 
                  source={photos[left]} 
                  style={{ width: '100%', height: '100%' }}
                />
              </Animated.View>
            )
          } else if(id === right) {
            return (
              <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', transform: [{translateX: rightX}] }}>
                <Image 
                  source={photos[right]} 
                  style={{ width: '100%', height: '100%' }}
                />
              </Animated.View>
            )
          }
        })
      }
      </View>
    </PanGestureHandler>
  ); 
}