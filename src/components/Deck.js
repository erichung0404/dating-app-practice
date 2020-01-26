import React from 'react'; 
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';
import { connect } from 'react-redux'; 
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler'; 
 
import Card from './Card'; 
import Options from './Options';

export default function Deck(props) {
  const { 
    navigation, 
    profiles, 
    curr, 
    pan, 
    angle, 
    opacity, 
    showInfo, 
    updateCurr, 
    openInfoScreen, 
    closeInfoScreen
  } = props; 

  const dragEnabled = !showInfo; 
  const swipeEnabled = showInfo; 
  const next = curr + 1; 
  let swipeDirection = 'central'; 

  const angleConfig = angle.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '45deg']
  });
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

  let size = profiles.length; 

  return (
    <View style={styles.container}>
      {
        !size || curr === size ? 
          <View style={styles.base_container}>
            <Text style={styles.base}>Oops, no cards</Text> 
          </View> 
          : 
          <View style={styles.deck_container}>
            <PanGestureHandler 
              enabled={dragEnabled} 
              onGestureEvent={onGestureEvent} 
              onHandlerStateChange={onHandlerStateChange}
            >
            <View style={styles.deck}>
            {
              profiles.map((profile, id) => {
                if(id === curr) {
                  return (
                      <Animated.View 
                        style={{
                          ...styles.card_container_top, 
                          opacity, 
                          transform: [
                            {translateX: pan.x}, 
                            {translateY: pan.y}, 
                            {rotate: angleConfig}
                          ], 
                        }}
                      >
                      {
                        <Card 
                          top={true}
                          profile={profile} 
                          style={cardStyle} 
                          infoPressHandler={() => openInfoScreen(animation)} 
                          swipeEnabled={swipeEnabled} 
                          infoPageEnabled={showInfo}
                        />
                      }
                      </Animated.View>
                  ); 
                } else if(id === next && !showInfo) {
                  return (
                    <Animated.View 
                      style={styles.card_container}
                    >
                      <Card 
                        top={false}
                        profile={profile} 
                        style={cardStyle} 
                        swipeEnabled={false} 
                        infoPageEnabled={false} 
                      />
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
                  style={styles.icon}
                  onPress={() => closeInfoScreen(animation)}
                /> 
                : 
                null
            }
            </View>
            </PanGestureHandler>
            <View style={styles.options_container}>
              <Options 
                dislikeHandler={handleDislike}
                likeHandler={handleLike}
              />
            </View>
          </View>
      }
    </View>
  ); 

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
    if(showInfo) closeInfoScreen(animation); 
    Animated.sequence([
      Animated.parallel([
        rotate(10, 500), 
        position({x: -300, y: 50} , 500), 
        fadeOut(0, 1000)
      ]), 
      position({x: 0, y: 0}, 0), 
      rotate(0, 0)
    ]).start(() => {
      updateCurr(next); 
      opacity.setValue(1); 
    }); 
  }

  function handleLike() {
    if(showInfo) closeInfoScreen(animation); 
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
      opacity.setValue(1); 
    }); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  base_container: {
    flex: 1, 
    justifyContent: 'center'
  }, 
  base: {
    alignSelf: 'center'
  }, 
  deck_container: { 
    flex: 1
  }, 
  deck: {
    flex: 8.5
  }, 
  card_container_top: {
    position: 'absolute', 
    height: '100%', 
    width: '100%',     
    zIndex: 1
  }, 
  card_container: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  }, 
  icon: {
    color: 'red', 
    alignSelf: 'flex-end', 
    paddingRight: '5%', 
    top: '75%', 
    zIndex: 1
  }, 
  options_container: {
    flex: 1.5, 
    zIndex: -1
  }
})