import React from 'react'; 
import Touchable from 'react-native-platform-touchable';
import { 
  View, 
  Dimensions, 
  TouchableWithoutFeedback, 
  Animated 
} from 'react-native'; 
import { 
  PanGestureHandler, 
  TapGestureHandler, 
  State 
} from 'react-native-gesture-handler'; 

const { width, height } = Dimensions.get('window'); 
const SPACE_SIZE = 10; // desired space between indicators
const HALF_SCREEN_WIDTH = width / 2; 

export default function Photo(props) {
  /**
   * use state to prevent pointers from re-assigned
   * after open/close info page
   */
  const { 
    curr, 
    prev, 
    next, 
    photos, 
    swipeEnabled, 
    imageStyle, 
    isInfoPageEnabled 
  } = props; 

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
    // show target image
    if(list[target._value]) {
      list[curr._value].imageOpacity.setValue(0); 
      list[target._value].imageOpacity.setValue(1); 

      // show target indicator
      updateIndicators(target); 

      // update pointers
      updatePointers(target); 
    }
  }

  function stopAllAnimations() {
    for(let i = prev._value; i <= next._value; i++) {
      if(!list[i]) continue; 
      list[i].panX.stopAnimation(); 
      list[i].imageOpacity.stopAnimation(); 
      list[i].indicatorOpacity.stopAnimation(); 
    }
  }

  function updateIndicators(target) {
    list[curr._value].indicatorOpacity.setValue(0.5); 
    list[target._value].indicatorOpacity.setValue(1); 
  }

  function updatePointers(target) {
    curr.setValue(target._value); 
    prev.setValue(curr._value-1); 
    next.setValue(curr._value+1); 
  }

  function onHandlerStateChange({ nativeEvent }) {
    const { 
      translationX, 
      velocityX, 
      state 
    } = nativeEvent; 

    if(state === State.BEGAN) {
      if(list[prev._value]) list[prev._value].panX.setValue(translationX - width); 
      if(list[next._value]) list[next._value].panX.setValue(translationX + width); 
    } else if(state === State.END) {
      onSwipeEnd(translationX > 0 ? prev : next, translationX, velocityX); 
    }
  }

  function onSwipeActive(translationX) {
    list[curr._value].panX.setValue(translationX); 
    if(translationX > 0 && list[prev._value]) { // right swipe
      list[prev._value].panX.setValue(translationX - width); 
      list[prev._value].imageOpacity.setValue(1); 
    } else if(translationX < 0 && list[next._value]) { // left swipe
      list[next._value].panX.setValue(translationX + width);
      list[next._value].imageOpacity.setValue(1); 
    }
  }

  function onSwipeEnd(target, dx, vx) {
    const dx_abs = Math.abs(dx); 
    const vx_abs = Math.abs(vx); 
    if(list[target._value] && (dx_abs > HALF_SCREEN_WIDTH || vx_abs > 1000)) { // valid swipe
      // start animation
      // dx > 0: right swipe, o.w.: left swipe
      updateIndicators(target); 
      Animated.parallel([
        Animated.spring(list[curr._value].panX, {
          toValue: dx > 0 ? width : -width, 
          bounciness: 0
        }), 
        Animated.spring(list[target._value].panX, {
          toValue: 0, 
          bounciness: 0
        })
      ]).start(); 
      updatePointers(target);
    } else {
      const animatedEvents = [
        Animated.spring(list[curr._value].panX, {
          toValue: 0
        })
      ]; 
      if(list[target._value]) {
        animatedEvents.push(
          Animated.spring(list[target._value].panX, {
            toValue: dx > 0 ? -width : width
          })
        ); 
      }
      Animated.parallel(animatedEvents).start(); 
    }
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