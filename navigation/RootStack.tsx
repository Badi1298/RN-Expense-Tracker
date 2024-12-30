import { createStackNavigator } from '@react-navigation/stack';

import RootBottomTabs from './RootBottomTabs';
import AuthScreen from '../screens/AuthScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

// export type RootStackParamsList = {
//     Tabs: undefined;
//     AddExpense: { expenseId: string | null };
// };

export type RootStackParamsList = {
    Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

export default function RootStack() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen
                name="Tabs"
                component={RootBottomTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddExpense"
                component={AddExpenseScreen}
                options={{ presentation: 'modal' }}
            /> */}
            <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
