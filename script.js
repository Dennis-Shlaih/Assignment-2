// DOM Elements
const expenseForm = document.querySelector("#expense-form")

const descriptionInput = document.querySelector("#description");

const amountInput = document.querySelector("#amount");

const categoryInput = document.querySelector("#category");

const dateInput = document.querySelector("#date");

const expenseList = document.querySelector("#expense-list");

const overallTotal = document.querySelector("#overall-total");

const expenseCount = document.querySelector("#expense-count");

const errorMessage = document.querySelector("#error-message");

// Application State
let expenses = [];

// Functions
const renderExpenses = () => {
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const expenseCard = document.createElement("div");
        expenseCard.textContent = 
            `${expense.description} - $${expense.amount}`;
        expenseList.appendChild(expenseCard);
    });
    updateTotals();
};

const validateForm = (description, amount, date) => {
    if (description.trim() === "") {
        return "Description is required.";
    }
    
    if (amount <= 0) {
        return "Amount must be greater than 0.";
    }
    
    if (!date) {
        return "Please select a date.";
    }

    return "";
};

const updateTotals = () => {
    let totalAmount = expenses.reduce((acc, expense) => 
        acc + expense.amount, 0);
    overallTotal.textContent = totalAmount;
    expenseCount.textContent = expenses.length;
};

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const error = validateForm(description, amount, date);
    if (!error) {
        errorMessage.textContent = "";
        const expense = {
            id: Date.now(),
            description,
            amount,
            category,
            date
        };
        expenses.push(expense);
        renderExpenses();
        expenseForm.reset();
    }
    else {
        errorMessage.textContent = error;
    }
});



