import React from 'react'; 
import Touchable from 'react-native-platform-touchable';
import { 
  View, 
  Dimensions, 
  TouchableWithoutFeedback, 
  Animated, 
  StyleSheet
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
    top, 
    photos, 
    swipeEnabled, 
    imageStyle, 
    isInfoPageEnabled 
  } = props; 

  let {
    curr, 
    prev, 
    next, 
  } = props; 

  if(!top) { 
    /** 
     * use different pointers so 
     * the card behind won't change
     * with the top pointers
     */
    curr = new Animated.Value(0); 
    prev= new Animated.Value(-1); 
    next = new Animated.Value(1); 
  }
  
  const list = []
  for(let i = 0; i < photos.length; i++) {
    list.push({
      panX: new Animated.Value(0), 
      imageOpacity: new Animated.Value(curr._value===i ? 1:0), 
      indicatorOpacity: new Animated.Value(curr._value===i ? 1:0.5)
    }); 
  }

  const INDICATOR_WIDTH = (width - SPACE_SIZE * (photos.length + 1)) / photos.length; 
  const INDICATOR_HEIGHT = INDICATOR_WIDTH / 20; 

  return (
    <PanGestureHandler 
      enabled={swipeEnabled}
      onGestureEvent={onSwipeActive}
      onHandlerStateChange={onHandlerStateChange}
    >
      <View style={ styles.container }>
        <Animated.View 
          style={{
            ...imageStyle, 
            ...styles.animation_container
          }}
        >
        {
          list.map((item, id) => {
            return (
              <Animated.View 
                style={{ 
                  ...styles.image_animation_container, 
                  opacity: item.imageOpacity, 
                  transform:[{translateX: item.panX}]
                }}
              >
                <Animated.Image
                  style={{ 
                    ...styles.image_animation, 
                    borderRadius: imageStyle.borderRadius
                  }}
                  source={photos[id]}
                />
              </Animated.View>
            ); 
          })
        }
          <View style={styles.touchable_container}>
            <View style={styles.touchable_panel_container}>
              <View style={styles.touchable_panel_row}>
                <TapGestureHandler
                  onHandlerStateChange={({ nativeEvent }) => {
                    if(nativeEvent.state === State.END) onPress(prev); 
                  }}
                >
                  <View style={styles.touchable_panel} />
                </TapGestureHandler>
                <TapGestureHandler
                  onHandlerStateChange={({ nativeEvent }) => {
                    if(nativeEvent.state === State.END) onPress(next); 
                  }}
                >
                  <View style={styles.touchable_panel} />
                </TapGestureHandler>
              </View>
            </View>
            <View style={styles.touchable_bar_container}>
              <View style={styles.touchable_bar_container_row}>
              {
                list.map((item, id) => {
                  return (
                    <TouchableWithoutFeedback 
                      onPress={() => onPress(new Animated.Value(id))}
                    >
                      <Animated.View 
                        style={{ 
                          ...styles.touchable_bar, 
                          width: INDICATOR_WIDTH, 
                          height: INDICATOR_HEIGHT, 
                          opacity: item.indicatorOpacity 
                        }} 
                      />
                    </TouchableWithoutFeedback>
                  ); 
                })
              }
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </PanGestureHandler>
  )

  function onPress(target) {
    // show target image
    if(list[target._value]) {
      list[curr._value].imageOpacity.setValue(0); 
      list[target._value].imageOpacity.setValue(1); 
      list[target._value].panX.setValue(0); 

      // show target indicator
      updateIndicators(target); 

      // update pointers
      updatePointers(target); 
    }
  }

  function onHandlerStateChange({ nativeEvent }) {
    const { 
      translationX, 
      velocityX, 
      state 
    } = nativeEvent; 

    if(state === State.BEGAN) {
      if(list[prev._value]) {
        list[prev._value].panX.setValue(translationX - width); 
        list[prev._value].imageOpacity.setValue(1); 
      }
      if(list[next._value]) {
        list[next._value].panX.setValue(translationX + width); 
        list[next._value].imageOpacity.setValue(1); 
      }
    } else if(state === State.END) {
      onSwipeEnd(translationX > 0 ? prev : next, translationX, velocityX); 
    }
  }

  function onSwipeActive({ nativeEvent }) {
    const { translationX } = nativeEvent; 
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
      ]).start(() => {
        if(list[prev._value]) list[prev._value].imageOpacity.setValue(0); 
        if(list[next._value]) list[next._value].imageOpacity.setValue(0); 
      }); 
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
      Animated.parallel(animatedEvents).start(() => {
        if(list[prev._value]) list[prev._value].imageOpacity.setValue(0); 
        if(list[next._value]) list[next._value].imageOpacity.setValue(0); 
      }); 
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  animation_container: {
    alignSelf: 'center'
  }, 
  image_animation_container: {
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    alignItems: 'center'
  }, 
  image_animation: {
    width: '100%', 
    height: '100%'
  }, 
  touchable_container: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  }, 
  touchable_panel_container: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  }, 
  touchable_panel_row: {
    flex: 1, 
    flexDirection: 'row'
  }, 
  touchable_panel: {
    flex: 1
  }, 
  touchable_bar_container: { 
    position: 'absolute', 
    height: 20, 
    width: '100%', 
    paddingTop: 20 
  }, 
  touchable_bar_container_row: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around'
  }, 
  touchable_bar: {
    borderRadius: 50, 
    backgroundColor: 'white'
  }
}); 

