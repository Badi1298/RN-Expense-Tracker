import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

import { Ionicons } from '@expo/vector-icons';

import AllExpensesScreen from '../screens/AllExpensesScreen';
import RecentExpensesScreen from '../screens/RecentExpensesScreen';
import { Alert } from 'react-native';

export type RootTabParamsList = {
    RecentExpenses: undefined;
    AllExpenses: undefined;
    AddExpense: { expenseId: string | null };
};

const RootTab = createBottomTabNavigator<RootTabParamsList>();

export default function RootBottomTabs() {
    const dispatch = useDispatch();

    return (
        <RootTab.Navigator
            screenOptions={({ navigation }) => ({
                headerRight: ({ tintColor }) => (
                    <>
                        <Ionicons
                            name="add"
                            size={24}
                            color={tintColor}
                            style={{ marginRight: 16 }}
                            onPress={() =>
                                navigation.navigate('AddExpense', {
                                    expenseId: null,
                                })
                            }
                        />
                        <Ionicons
                            name="log-out-outline"
                            size={24}
                            color={tintColor}
                            style={{ marginRight: 10 }}
                            onPress={() => {
                                Alert.alert(
                                    'Confirm Logout',
                                    'Are you sure you want to logout?',
                                    [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Logout',
                                            onPress: () => dispatch(logout()),
                                        },
                                    ],
                                    { cancelable: true }
                                );
                            }}
                        />
                    </>
                ),
            })}
        >
            <RootTab.Screen
                name="RecentExpenses"
                component={RecentExpensesScreen}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="hourglass-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <RootTab.Screen
                name="AllExpenses"
                component={AllExpensesScreen}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All Expenses',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="calendar-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </RootTab.Navigator>
    );
}
