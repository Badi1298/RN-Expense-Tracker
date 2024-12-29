import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
    id: string | null;
    title: string;
    amount: string;
    date: string;
}

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: [] as Expense[],
    reducers: {
        removeExpense(state, action: PayloadAction<string>) {
            return state.filter((expense) => expense.id !== action.payload);
        },
    },
});

export const { removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
