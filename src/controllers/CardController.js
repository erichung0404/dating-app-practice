import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Animated, Image, PanResponder, Modal } from 'react-native';
import { connect } from 'react-redux'; 
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler'; 
 
import Card from '../components/Card'; 
import Options from '../components/Options';

import { 
  updateCurr, 
  openInfoScreen, 
  closeInfoScreen
} from '../actions/card'; 

const styles = StyleSheet.create({
  card_container: { 
    flex: 8, 
    zIndex: 0
  }
})

function CardController(props) {
  const { 
    navigation, 
    profiles, 
    curr, 
    showInfo, 
    updateCurr, 
    openInfoScreen, 
    closeInfoScreen
  } = props; 

  const dragEnabled = !showInfo; 
  const swipeEnabled = showInfo; 

  const pan = new Animated.ValueXY(); 
  const angle = new Animated.Value(0); 
  const opacity = new Animated.Value(1); 
  const next = curr + 1; 
  let swipeDirection = 'central'; 

  const borderRadius = new Animated.Value(10); 
  const width = new Animated.Value(0); 
  const height = new Animated.Value(1);

  const animation = {
    navigation, 
    borderRadius, 
    width, 
    height
  };

  const cardStyle = {
    imageStyle: { 
      position: 'absolute', 
      borderRadius, 
      width: width.interpolate({
        inputRange: [0, 1], 
        outputRange: ['95%', '100%']
      }), 
      height: height.interpolate({
        inputRange: [0, 1], 
        outputRange: ['80%', '100%']
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
          updateCurr(next); 
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
      updateCurr(next); 
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
      updateCurr(next); 
    }); 
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
            <View style={{ flex: 8.5 }}>
            {
              profiles
                .map((profile, id) => {
                  if(id === curr) {
                    return (
                        <Animated.View 
                          style={{position: 'absolute', opacity, height: '100%', width: '100%', transform: [{translateX: pan.x}, {translateY: pan.y}, {rotate: angleConfigs}], zIndex: 1 }}
                        >
                        {
                          <Card profile={profile} infoPressHandler={() => openInfoScreen(animation)} swipeEnabled={swipeEnabled} style={cardStyle} infoPageEnabled={showInfo} />
                        }
                        </Animated.View>
                    ); 
                  } else if(id === next && !showInfo) {
                    return (
                      <Animated.View 
                        style={{position: 'absolute', height: '100%', width: '100%'}}
                      >
                        <Card profile={profile} swipeEnabled={false} style={cardStyle} infoPageEnabled={false} />
                      </Animated.View>
                    ); 
                  }
                }) 
            }
            {
              showInfo ? 
                <Ionicons
                  name={'ios-arrow-dropdown-circle'}
                  size={60}
                  style={{ color: 'red', alignSelf: 'flex-end', paddingRight: '5%', top: '75%', zIndex: 1 }}
                  onPress={() => closeInfoScreen(animation)}
                /> : null
            }
            </View>
            </PanGestureHandler>
            <View style={{ flex: 1.5, zIndex: -1 }}>
              <Options dislikeHandler={handleDislike} likeHandler={handleLike} />
            </View>
          </View>
      }
    </View>
  ); 
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles, 
  curr: state.card.curr, 
  showInfo: state.card.showInfo
})

const mapDispatchToProps = dispatch => ({
  updateCurr: dest => dispatch(updateCurr(dest)), 
  openInfoScreen: animation => dispatch(openInfoScreen(animation)), 
  closeInfoScreen: animation => dispatch(closeInfoScreen(animation))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardController); 