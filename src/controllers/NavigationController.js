import React from 'react'; 
import { Platform } from 'react-native'; 
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; 
import { createAppContainer } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';

import HomeController from './HomeController'; 
import ProfileController from './ProfileController'; 
import MessageController from './MessageController'; 

const NavigationController = createMaterialTopTabNavigator(
  {
    ProfileController: {
      screen: ProfileController, 
      navigationOptions: ({ navigation }) => { 
        const { params } = navigation.state; 

        return {
          tabBarIcon: ({tintColor, focused}) => (
              <Ionicons
                name={'ios-person'}
                size={30}
                style={{color: tintColor}}
              />
          ),
          swipeEnabled: true, 
          tabBarVisible: params && params.tabBarVisible
        }
      }
    }, 
    HomeController: { 
      screen: HomeController, 
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
    MessageController: { 
      screen: MessageController, 
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
    initialRouteName: "HomeController",
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false, 
      showIcon: true, 
      activeTintColor: 'red', 
      inactiveTintColor: 'gray', 
      style: { 
        backgroundColor: 'transparent', 
        marginTop: Platform.OS === 'ios' ? 20 : 0
      }, 
      indicatorStyle: { height: 0 }
    }
  }
);

export default createAppContainer(NavigationController); 