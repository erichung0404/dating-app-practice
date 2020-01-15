import React, { useState } from 'react'; 
import { View, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native'; 
import Touchable from 'react-native-platform-touchable';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler'; 

const { width, height } = Dimensions.get('window'); 
const SPACE_SIZE = 10; // desired space between indicators
const HALF_SCREEN_WIDTH = width / 2; 

export default function PhotoViewController(props) {
  const { photos, swipeEnabled, imageStyle, isInfoPageEnabled } = props; 

  /**
   *  use state to prevent from re-rendering when open/close CardInfoView
   *  or images will be re-rendered but pointers are not updated
   *  so the photo will not respond to tap since animataed.view
   *  has referenced new pointers
   */
  const [curr, setCurr] = useState(new Animated.Value(0)); 
  const [prev, setPrev] = useState(new Animated.Value(0)); 
  const [next, setNext] = useState(new Animated.Value(1)); 

  const list = [{
    panX: new Animated.Value(0), 
    imageOpacity: new Animated.Value(1), 
    indicatorOpacity: new Animated.Value(1)
  }]; 

  for(let i = 1; i < photos.length; i++) {
    list.push({
      panX: new Animated.Value(0), 
      imageOpacity: new Animated.Value(0), 
      indicatorOpacity: new Animated.Value(0.5)
    }); 
  }

  const INDICATOR_WIDTH = (width - SPACE_SIZE * (photos.length + 1)) / photos.length; 
  const INDICATOR_HEIGHT = INDICATOR_WIDTH / 20; 

  function onPress(target) {
    stopAllAnimation(); 

    // show target image
    list[curr._value].imageOpacity.setValue(0); 
    list[target._value].imageOpacity.setValue(1); 

    // show target indicator
    updateIndicators(target); 

    // update pointers
    updatePointers(target); 
  }

  function onHandlerStateChange({ nativeEvent }) {
    const { translationX, velocityX, state } = nativeEvent; 

    if(state === State.BEGAN) {
      stopAllAnimation(); 
    }else if(state === State.END) {
      onSwipeEnd(translationX > 0 ? prev : next, translationX, velocityX); 
    }
  }

  function stopAllAnimation() {
    for(let i = 0; i < list.length; i++) {
      list[i].panX.stopAnimation(); 
      list[i].imageOpacity.stopAnimation(); 
      list[i].indicatorOpacity.stopAnimation(); 
    }
  }

  function onSwipeActive(translationX) {
      if(curr._value > 0 && translationX > 0) { // right swipe
        list[curr._value].panX.setValue(translationX); 
        list[prev._value].panX.setValue(translationX + (translationX > 0 ? -width : translationX < 0 ? width : 0)); 
        list[prev._value].imageOpacity.setValue(1); 
      } else if(curr._value < photos.length-1 && translationX < 0) { // left swipe
        list[curr._value].panX.setValue(translationX); 
        list[next._value].panX.setValue(translationX + (translationX > 0 ? -width : translationX < 0 ? width : 0));
        list[next._value].imageOpacity.setValue(1); 
      }
  }

  function onSwipeEnd(target, dx, vx) {
    if((dx > 0 && curr._value === 0) || 
        (dx < 0 && curr._value === list.length-1)) return; 

    const dx_abs = Math.abs(dx); 
    const vx_abs = Math.abs(vx); 
    if(dx_abs > HALF_SCREEN_WIDTH || vx_abs > 1000) { // valid swipe
      // start animation
      // dx > 0: right swipe, o.w.: left swipe
      updateIndicators(target); 
      Animated.parallel([
        Animated.spring(list[curr._value].panX, {
          toValue: dx > 0 ? width : -width, 
          bounciness: 0, 
          velocity: vx
        }), 
        Animated.spring(list[target._value].panX, {
          toValue: 0, 
          bounciness: 0, 
          velocity: vx
        }), 
      ]).start(() => { 
        updatePointers(target);
        reset(); 
      }); 
    } else {
      Animated.parallel([
        Animated.spring(list[curr._value].panX, {
          toValue: 0, 
          duration: 1000
        }), 
        Animated.spring(list[target._value].panX, {
          toValue: dx > 0 ? -width : width, 
          duration: 1000
        })
      ]).start(() => reset()); 
    }
  }

  function updateIndicators(target) {
    list[curr._value].indicatorOpacity.setValue(0.5); 
    list[target._value].indicatorOpacity.setValue(1); 
  }

  function updatePointers(target) {
    curr.setValue(target._value); 
    prev.setValue(curr._value - (curr._value === 0 ? 0 : 1)); 
    next.setValue(curr._value + (curr._value === list.length-1 ? 0 : 1)); 
  }

  function reset() {
    list[curr._value].imageOpacity.setValue(1); 
    list[curr._value].panX.setValue(0); 

    if(curr._value !== prev._value) {
      list[prev._value].imageOpacity.setValue(0); 
      list[prev._value].panX.setValue(0); 
    }

    if(curr._value !== next._value) {
      list[next._value].imageOpacity.setValue(0); 
      list[next._value].panX.setValue(0);
    }
  }

  return (
    <PanGestureHandler 
      enabled={swipeEnabled}
      onGestureEvent={({ nativeEvent }) => {
        const { translationX } = nativeEvent; 
        onSwipeActive(translationX); 
      }}
      onHandlerStateChange={onHandlerStateChange}
    >
    <Animated.View style={{...imageStyle, alignSelf: 'center'}}>
    {
      list.map((item, id) => {
        return (
          <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', opacity: item.imageOpacity, transform:[{translateX: item.panX}] }}>
            <Animated.Image
              style={{ width: '100%', height: '100%', borderRadius: imageStyle.borderRadius }}
              source={photos[id]}
            />
          </Animated.View>
        ); 
      })
    }
      <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
        <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TapGestureHandler
              onHandlerStateChange={({ nativeEvent }) => {
                if(nativeEvent.state === State.END) onPress(prev); 
              }}
            >
              <View style={{ flex: 1 }} />
            </TapGestureHandler>
            <TapGestureHandler
              onHandlerStateChange={({ nativeEvent }) => {
                if(nativeEvent.state === State.END) onPress(next); 
              }}
            >
              <View style={{ flex: 1 }} />
            </TapGestureHandler>
          </View>
        </View>
        <View style={{ position: 'absolute', height: 20, width: '100%', paddingTop: 20 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          {
            list.map((item, id) => {
              return (
                <TouchableWithoutFeedback 
                  onPress={() => onPress(new Animated.Value(id))}
                >
                  <Animated.View 
                    style={{ width: INDICATOR_WIDTH, height: INDICATOR_HEIGHT, borderRadius: 50, backgroundColor: 'white', opacity: item.indicatorOpacity }} 
                  />
                </TouchableWithoutFeedback>
              ); 
            })
          }
          </View>
        </View>
      </View>
    </Animated.View>
    </PanGestureHandler>
  )
}