import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import AllExpensesScreen from '../screens/AllExpensesScreen';
import RecentExpensesScreen from '../screens/RecentExpensesScreen';

export type RootTabParamsList = {
    RecentExpenses: undefined;
    AllExpenses: undefined;
    AddExpense: { expenseId: number | null };
};

const RootTab = createBottomTabNavigator<RootTabParamsList>();

export default function RootBottomTabs() {
    return (
        <RootTab.Navigator
            screenOptions={({ navigation }) => ({
                headerRight: ({ tintColor }) => (
                    <Ionicons
                        name="add"
                        size={24}
                        color={tintColor}
                        style={{ marginRight: 10 }}
                        onPress={() =>
                            navigation.navigate('AddExpense', {
                                expenseId: null,
                            })
                        }
                    />
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
