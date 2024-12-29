import axios from 'axios';

const BASE_URL =
    'https://rn-expense-44183-default-rtdb.europe-west1.firebasedatabase.app/';

function getExpenses() {
    return axios.get(`${BASE_URL}/expenses.json`);
}

function storeExpense(expense) {
    return axios.post(`${BASE_URL}/expenses.json`, expense);
}

export { getExpenses, storeExpense };
