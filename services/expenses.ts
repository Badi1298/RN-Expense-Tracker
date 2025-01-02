import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Expense } from '../types/expenses';

const baseUrl = 'https://rn-expense-44183-default-rtdb.europe-west1.firebasedatabase.app/';

export const expensesApi = createApi({
    reducerPath: 'expensesApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
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
        storeExpense: builder.mutation<Expense, Partial<Expense>>({
            query: (body) => ({
                url: 'expenses.json',
                method: 'POST',
                body,
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

export const { useGetExpensesQuery, useStoreExpenseMutation, useUpdateExpenseMutation, useRemoveExpenseMutation } = expensesApi;
