import React from 'react';

import { RootState } from '../store';
import { useSelector } from 'react-redux';

import ExpensesList from '../components/ExpensesList';

export default function AllExpensesScreen() {
    const expenses = useSelector((state: RootState) => state.expenses);

    return <ExpensesList expenses={expenses} />;
}
