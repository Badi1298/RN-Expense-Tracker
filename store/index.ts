import { configureStore } from '@reduxjs/toolkit';

import { expensesApi } from '../services/expenses';
import expensesReducer from './slices/expensesSlice';

export const store = configureStore({
    reducer: {
        [expensesApi.reducerPath]: expensesApi.reducer,
        expenses: expensesReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(expensesApi.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
