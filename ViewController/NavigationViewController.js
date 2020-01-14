import React from 'react'; 
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; 
import { createAppContainer } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';

import HomeView from '../View/Home/HomeView'; 
import ProfileView from '../View/Profile/ProfileView'; 
import MessageView from '../View/Message/MessageView'; 

const NavigationViewController = createMaterialTopTabNavigator(
  {
    ProfileView: { 
      screen: ProfileView, 
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
    HomeView: { 
      screen: HomeView, 
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
    MessageView: { 
      screen: MessageView, 
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
    initialRouteName: "HomeView",
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

export default createAppContainer(NavigationViewController); 