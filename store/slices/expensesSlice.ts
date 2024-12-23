import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
    id: number;
    title: string;
    amount: string;
    date: Date;
}

const initialState: Expense[] = [
    {
        id: 1,
        title: 'Car Insurance',
        amount: '294.67',
        date: new Date(2024, 11, 15),
    },
    {
        id: 2,
        title: 'Toilet Paper',
        amount: '4.99',
        date: new Date(2024, 11, 16),
    },
    {
        id: 3,
        title: 'New Desk (Wooden)',
        amount: '450',
        date: new Date(2024, 11, 17),
    },
    {
        id: 4,
        title: 'New TV',
        amount: '799.99',
        date: new Date(2024, 11, 18),
    },
    {
        id: 5,
        title: 'Rent',
        amount: '1200',
        date: new Date(2024, 11, 19),
    },
    {
        id: 6,
        title: 'Groceries',
        amount: '150.25',
        date: new Date(2024, 10, 10),
    },
    {
        id: 7,
        title: 'Gym Membership',
        amount: '45.99',
        date: new Date(2024, 9, 5),
    },
    {
        id: 8,
        title: 'Internet Bill',
        amount: '60.0',
        date: new Date(2024, 8, 20),
    },
    {
        id: 9,
        title: 'Electricity Bill',
        amount: '75.5',
        date: new Date(2024, 7, 25),
    },
    {
        id: 10,
        title: 'Water Bill',
        amount: '30.0',
        date: new Date(2024, 6, 15),
    },
];

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense(state, action: PayloadAction<Expense>) {
            state.push(action.payload);
        },
        removeExpense(state, action: PayloadAction<number>) {
            return state.filter((expense) => expense.id !== action.payload);
        },
    },
});

export const { addExpense, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
