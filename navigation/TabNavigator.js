import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';

import { HomeStackNavigator, GoalsStackNavigator, StatisticsStackNavigator, CalendarStackNavigator, AccountStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      
      <Tab.Screen 
      name="Home" 
      component={HomeStackNavigator} 
      options={{ tabBarIcon: ({size, color}) => (<Icon name={"home"} color={'#6ebf4a'} size={size} />)
      }} 
      />

      <Tab.Screen 
      name="Goals" 
      component={GoalsStackNavigator}
      options={{ tabBarIcon: ({size, color}) => (<Icon name={"bookmark"} color={'#6ebf4a'} size={size} />)
      }}
      />


      <Tab.Screen 
      name="Statistics" 
      component={StatisticsStackNavigator} 
      options={{ tabBarIcon: ({size, color}) => (<Icon name={"bar-chart"} color={'#6ebf4a'} size={size} />)
      }}
      
      />
      <Tab.Screen 
      name="Calendar" 
      component={CalendarStackNavigator}
      options={{ tabBarIcon: ({size, color}) => (<Icon name={"calendar"} color={'#6ebf4a'} size={size} />)
      }}
      
       />
      <Tab.Screen 
      name="Account" 
      component={AccountStackNavigator} 
      options={{ tabBarIcon: ({size, color}) => (<Icon name={"users"} color={'#6ebf4a'} size={size} />)
      }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
