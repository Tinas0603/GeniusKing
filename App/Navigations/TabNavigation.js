import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LeaderBoard from "../Screen/LeaderBoard";
import MyCourse from "../Screen/MyCourse";
import Profile from "../Screen/Profile";
import HomeScreen from "../Screen/HomeScreen";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import HomeScreenNavigation from "./HomeScreenNavigation";
import Colors from "../Utils/Colors";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={Colors.SECONDARY} />
          ),
        }}
      />
      <Tab.Screen
        name="My Course"
        component={MyCourse}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={Colors.SECONDARY} />
          ),
        }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="leaderboard"
              size={size}
              color={Colors.SECONDARY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="user-circle"
              size={size}
              color={Colors.SECONDARY}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
