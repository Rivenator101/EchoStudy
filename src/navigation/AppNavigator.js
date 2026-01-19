import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';

// Screens
import DashboardScreen from '../screens/Home/DashboardScreen';
import GoalCreationScreen from '../screens/Study/GoalCreationScreen';
import FocusSessionScreen from '../screens/Study/FocusSessionScreen';
import TaskListScreen from '../screens/Study/TaskListScreen';
import AvatarScreen from '../screens/Progress/AvatarScreen';
import QuestScreen from '../screens/Progress/QuestScreen';
import TimelineScreen from '../screens/Progress/TimelineScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Study" component={TaskListScreen} />
      <Tab.Screen name="Progress" component={AvatarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <Stack.Navigator>
      {!currentUser ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="GoalCreation" component={GoalCreationScreen} options={{ title: 'Create Goal' }} />
          <Stack.Screen name="FocusSession" component={FocusSessionScreen} options={{ title: 'Focus Session' }} />
          <Stack.Screen name="Quests" component={QuestScreen} options={{ title: 'Quests' }} />
          <Stack.Screen name="Timeline" component={TimelineScreen} options={{ title: 'Progress Timeline' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

