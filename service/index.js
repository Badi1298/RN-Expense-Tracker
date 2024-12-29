import axios from 'axios';

const baseURL =
    'https://rn-expense-44183-default-rtdb.europe-west1.firebasedatabase.app/';

function getExpenses() {
    return axios.get('/expenses');
}

function storeExpense(expense) {
    return axios.post(baseURL + 'expenses.json', expense);
}

export { getExpenses, storeExpense };
