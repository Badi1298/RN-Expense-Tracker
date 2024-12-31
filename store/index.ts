import { configureStore } from '@reduxjs/toolkit';

import { expensesApi } from '../services/expenses';

import authReducer from './slices/authSlice';
import expensesReducer from './slices/expensesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
        [expensesApi.reducerPath]: expensesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(expensesApi.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
