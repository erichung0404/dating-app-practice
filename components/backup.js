import React, { useState, useContext } from 'react'; 
import { View, Text, StyleSheet, Animated, Image, PanResponder, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 
import { AppContext } from '../App'; 
import Card from './Card'; 
import DecisionPanel from './DecisionPanel'; 
import PhotoNavigator from './PhotoNavigator'; 
import Swipeable from './Swipeable'; 

const styles = StyleSheet.create({
  card_container: { 
    flex: 8, 
    zIndex: 0
  }
})

export default function Deck(props) {
  const [curr, setCurr] = useState(0); 
  const [isInfoPage, setIsInfoPage] = useState(false); 
  const { profiles } = useContext(AppContext); 

  const pan = new Animated.ValueXY(); 
  const angle = new Animated.Value(0); 
  const opacity = new Animated.Value(1); 
  const next = curr + 1; 

  let swipeDirection = 'central'; 

  const _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: (e, gestureState) => {
      return !(gestureState.dx === 0 && gestureState.dy === 0)
    },
    onPanResponderMove: (e, gestureState) => {
      Animated.event([
        null, {dx: pan.x, dy: pan.y},
      ])(e, gestureState); 

      if(swipeDirection !== 'right' && pan.x._value > 0) {
        rotate(-40, 500).start(); 
        swipeDirection = 'right'; 
      } else if(swipeDirection !== 'left' && pan.x._value < 0) {
        rotate(40, 500).start(); 
        swipeDirection = 'left'; 
      }
    },
    onPanResponderRelease: (e, {vx, vy}) => {
      if(pan.x._value < -100 || pan.x._value > 100) {
        /**After top photo is thrown and fadeout, 
         * relocate photo to origin and unrotated.
         * Setting opacity to 1, removing current card
         * and rendering new profiles as follows: 
         * [photo1, photo2, ...] => [photo2, photo3, ...]
         */
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
  });

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

  function handleInfoPress() {
    setIsInfoPage(true); 
  }

  const [translateX, translateY] = [pan.x, pan.y];
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
            <View style={{ flex: 8.5 }}>
            {
              profiles
                .map((profile, id) => {
                  if(id === curr) {
                    return (
                      <Animated.View 
                        style={{position: 'absolute', opacity, height: '100%', width: '100%', transform: [{translateX}, {translateY}, {rotate: angleConfigs}], zIndex: 1 }}
                        {..._panResponder.panHandlers}
                      >
                        <Card profile={profile} infoPressHandler={handleInfoPress} />
                      </Animated.View>
                    ); 
                  } else if(id === next) {
                    return (
                      <Animated.View  
                        style={{...styles.card_container}}>
                        <Card profile={profile} />
                      </Animated.View>
                    ); 
                  }
                }) 
            }
            </View>
            <View style={{ flex: 1.5, zIndex: -1 }}>
              <DecisionPanel dislikeHandler={handleDislike} likeHandler={handleLike} />
            </View>
          </View>
      }
      <Modal 
        transparent={false} 
        visible={isInfoPage}
      >
        <View style={{ flex: 1 }}>
        {
          // use another navigator
          profiles
            .filter((profile, id) => id === curr)
            .map((profile, id) => {
              return (
                <PhotoNavigator photos={profile.album} swipeEnabled={true} />
              ); 
            })
        }
        </View>
        <View style={{ flex: 1 }} />
      </Modal>
    </View>
  ); 
}