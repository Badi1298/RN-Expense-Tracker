import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector } from 'react-redux';

import RootBottomTabs from './RootBottomTabs';
import AuthScreen from '../screens/AuthScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

export type RootStackParamsList = {
    Auth: undefined;
    Tabs: undefined;
    AddExpense: { expenseId: string | null };
};

const Stack = createStackNavigator<RootStackParamsList>();

export default function RootStack() {
    const isAuthenticated = useSelector(
        (state: { auth: { isAuthenticated: boolean } }) =>
            state.auth.isAuthenticated
    );

    if (!isAuthenticated) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tabs"
                component={RootBottomTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddExpense"
                component={AddExpenseScreen}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    );
}
