import { createStackNavigator } from '@react-navigation/stack';

import RootBottomTabs from './RootBottomTabs';
import AddExpenseScreen from '../screens/AddExpenseScreen';

export type RootStackParamsList = {
    Tabs: undefined;
    AddExpense: { expenseId: number | null };
};

const Stack = createStackNavigator<RootStackParamsList>();

export default function RootStack() {
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
