import React from 'react'; 
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; 
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen'; 
import ProfileScreen from './ProfileScreen'; 
import MessengerScreen from './MessengerScreen'; 

const MainNavigator = createMaterialTopTabNavigator(
  {
    ProfileScreen: { 
      screen: ProfileScreen, 
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
              name={'ios-person'}
              size={30}
              style={{color: tintColor}}
            />
        ),
      }, 
      swipeEnabled: true
    }, 
    HomeScreen: { 
      screen: HomeScreen, 
      navigationOptions: ({ navigation }) => {
        const { params } = navigation.state; 

        return {
          tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
              name={'ios-flame'}
              size={30}
              style={{color: tintColor}}
            />
          ), 
          swipeEnabled: true, 
          tabBarVisible: params && params.tabBarVisible // false when info section is pressed
        }
      }
    }, 
    MessengerScreen: { 
      screen: MessengerScreen, 
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={'ios-chatbubbles'}
            size={30}
            style={{color: tintColor}}
          />
        ), 
        swipeEnabled: true
      }
    }, 
  },
  {
    initialRouteName: "HomeScreen",
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false, 
      showIcon: true, 
      activeTintColor: 'red', 
      inactiveTintColor: 'gray', 
      style: { backgroundColor: 'transparent' }, 
      indicatorStyle: { height: 0 }
    }
  }
);

export default createAppContainer(MainNavigator);