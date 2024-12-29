import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Expense } from '../store/slices/expensesSlice';

const baseUrl =
    'https://rn-expense-44183-default-rtdb.europe-west1.firebasedatabase.app/';

export const expensesApi = createApi({
    reducerPath: 'expensesApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    tagTypes: ['Expense'],
    endpoints: (builder) => ({
        getExpenses: builder.query<Expense[], void>({
            query: () => 'expenses.json',
            transformResponse: (response: any) => {
                console.log(
                    Object.keys(response).map((key) => ({
                        id: key,
                        ...response[key],
                    }))
                );
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
    }),
});

export const {
    useGetExpensesQuery,
    useStoreExpenseMutation,
    useUpdateExpenseMutation,
} = expensesApi;
