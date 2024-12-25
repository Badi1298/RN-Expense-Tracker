import React from 'react';

import { RootState } from '../store';
import { useSelector } from 'react-redux';

import ExpensesList from '../components/ExpensesList';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamsList } from '../navigation/RootBottomTabs';

type Props = BottomTabScreenProps<RootTabParamsList, 'RecentExpenses'>;

export default function AllExpensesScreen({ navigation }: Props) {
    const expenses = useSelector((state: RootState) => state.expenses);

    function expenseItemPressHandler(id: number) {
        const foundExpense = expenses.find((expense) => expense.id === id);

        if (!foundExpense) return;

        navigation.navigate('AddExpense', { expenseId: foundExpense.id });
    }

    return (
        <ExpensesList
            expenses={expenses}
            onItemPress={expenseItemPressHandler}
        />
    );
}
