const incomeForm = document.getElementById("income-form");
const incomeAmount = document.getElementById("income-amount");

const expenseForm = document.getElementById("expense-form");
const expenseAmount = document.getElementById("expense-amount");
const expenseDesc = document.getElementById("expenseDesc");

const displayIncome = document.getElementById("displayIncome");
const balanceElement = document.getElementById("balance");
const expenseTableBody = document.getElementById("expense-table-body");
const clearExpensesButton = document.getElementById("clear-expenses");

let totalIncome = 0;
let expenses = [];

incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const incomeValue = parseInt(incomeAmount.value);
    if (!isNaN(incomeValue) && incomeValue > 0) {
        totalIncome += incomeValue; 
        incomeAmount.value = "";
        displayIncome.textContent = `Income: Rs ${totalIncome}`;
        updateBalance();
    } else {
        alert("Please enter a valid income amount.");
    }
});

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const expenseValue = parseInt(expenseAmount.value);
    if (expenseDesc.value.trim() === "" || isNaN(expenseValue) || expenseValue <= 0) {
        alert("Please enter a valid description and expense amount.");
        return;
    }

    const expense = {
        description: expenseDesc.value,
        amount: expenseValue,
    };
    expenses.push(expense);
    addExpenseToTable(expense);
    expenseDesc.value = "";
    expenseAmount.value = "";
    updateBalance();
});

const addExpenseToTable = (expense) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
    `;
    expenseTableBody.appendChild(row);
};


const updateBalance = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const balance = totalIncome - totalExpenses;
    balanceElement.textContent = `Balance: Rs ${balance}`;
};

clearExpensesButton.addEventListener("click", () => {
    expenses = [];
    expenseTableBody.innerHTML = ""; 
    totalIncome = 0;
    displayIncome.textContent = `Income: Rs 0`;
    balanceElement.textContent = `Balance: Rs 0`;
    alert("All expenses cleared.");
});
