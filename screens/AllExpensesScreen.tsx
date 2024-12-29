import React from 'react';

import ExpensesList from '../components/ExpensesList';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamsList } from '../navigation/RootBottomTabs';
import { useGetExpensesQuery } from '../services/expenses';

type Props = BottomTabScreenProps<RootTabParamsList, 'AllExpenses'>;

export default function AllExpensesScreen({ navigation }: Props) {
    const { data: expenses } = useGetExpensesQuery();

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
