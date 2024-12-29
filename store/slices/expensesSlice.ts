import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { expensesApi, useStoreExpenseMutation } from '../../services/expenses';

export interface Expense {
    id: number | null;
    title: string;
    amount: string;
    date: string;
}

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: [] as Expense[],
    reducers: {
        saveExpense(state, action: PayloadAction<Expense>) {
            const index = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            try {
                if (index !== -1) {
                    state[index] = action.payload;
                } else {
                    const [storeExpense] = useStoreExpenseMutation();
                    storeExpense(action.payload);
                }
            } catch (err: any) {
                throw new Error(err);
            }
        },

        removeExpense(state, action: PayloadAction<number>) {
            return state.filter((expense) => expense.id !== action.payload);
        },
    },
});

export const { saveExpense, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
