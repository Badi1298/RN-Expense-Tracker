import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { useGetExpensesQuery } from '../services/expenses';

import { useSelector } from 'react-redux';

import { RootTabParamsList } from '../navigation/RootBottomTabs';

import ExpensesList from '../components/ExpensesList';

type Props = BottomTabScreenProps<RootTabParamsList, 'AllExpenses'>;

export default function AllExpensesScreen({ navigation }: Props) {
    const token = useSelector(
        (state: { auth: { token: string } }) => state.auth.token
    );

    const { data: expenses } = useGetExpensesQuery(token);

    function expenseItemPressHandler(id: string) {
        const foundExpense = expenses?.find((expense) => expense.id === id);

        if (!foundExpense) return;

        navigation.navigate('AddExpense', { expenseId: foundExpense.id });
    }

    return (
        <ExpensesList
            expenses={expenses || []}
            onItemPress={expenseItemPressHandler}
        />
    );
}
