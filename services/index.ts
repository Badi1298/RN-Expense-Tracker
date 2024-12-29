import axios from 'axios';

import { Expense } from '../store/slices/expensesSlice';

const BASE_URL =
    'https://rn-expense-44183-default-rtdb.europe-west1.firebasedatabase.app/';

async function getExpenses() {
    const response = await axios.get(`${BASE_URL}/expenses.json`);

    console.log(response.data);

    const expenses = [];

    for (const key in response.data) {
        expenses.push({ ...response.data[key], id: key });
    }

    return expenses;
}

function storeExpense(expense: Expense) {
    return axios.post(`${BASE_URL}/expenses.json`, expense);
}

export { getExpenses, storeExpense };
