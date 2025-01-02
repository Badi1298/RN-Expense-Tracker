import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Expense } from '../types/expenses';

const baseUrl =
    'https://rn-expense-44183-default-rtdb.europe-west1.firebasedatabase.app/';

export const expensesApi = createApi({
    reducerPath: 'expensesApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    tagTypes: ['Expense'],
    endpoints: (builder) => ({
        getExpenses: builder.query<Expense[], string>({
            query: (token) => 'expenses.json?auth=' + token,
            transformResponse: (response: any) => {
                return Object.keys(response).map((key) => ({
                    id: key,
                    ...response[key],
                }));
            },
            providesTags: ['Expense'],
        }),
        storeExpense: builder.mutation<
            Expense,
            { token: string; expense: Partial<Expense> }
        >({
            query: ({ token, expense }) => ({
                url: 'expenses.json',
                method: 'POST',
                body: expense,
            }),
            invalidatesTags: ['Expense'],
        }),
        updateExpense: builder.mutation<Expense, Partial<Expense>>({
            query: (body) => ({
                url: `expenses/${body.id}.json`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Expense'],
        }),
        removeExpense: builder.mutation<void, string>({
            query: (id) => ({
                url: `expenses/${id}.json`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Expense'],
        }),
    }),
});

export const {
    useGetExpensesQuery,
    useStoreExpenseMutation,
    useUpdateExpenseMutation,
    useRemoveExpenseMutation,
} = expensesApi;
