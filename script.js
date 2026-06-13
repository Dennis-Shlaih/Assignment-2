// DOM Elements
const expenseForm = document.querySelector("#expense-form")

const descriptionInput = document.querySelector("#description");

const amountInput = document.querySelector("#amount");

const categoryInput = document.querySelector("#category");

const dateInput = document.querySelector("#date");

const expenseList = document.querySelector("#expense-list");

const overallTotal = document.querySelector("#overall-total");

const categoryTotals = document.querySelector("#category-totals");

const expenseCount = document.querySelector("#expense-count");

const errorMessage = document.querySelector("#error-message");

const categoryFilter = document.querySelector("#filter-category");

const emptyState = document.querySelector("#empty-state");


// Application State
let expenses = [];

// Category
let selectedCategory = "All"

// Functions
const renderExpenses = () => {
    expenseList.innerHTML = "";
    filteredExpenses = expenses;
    if (selectedCategory !== "All") {
        filteredExpenses = expenses.filter(expense => 
            expense.category === selectedCategory);
    } 
    if (filteredExpenses.length !== 0) {
        emptyState.style.display = "none";
    }
    else {
        emptyState.style.display = "block";
    }
    filteredExpenses.forEach(expense => {
        const expenseCard = document.createElement("div");
        expenseCard.textContent = 
            `${expense.description} - $${expense.amount}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        expenseCard.appendChild(deleteButton);
        expenseList.appendChild(expenseCard);
        deleteButton.addEventListener("click", () => {
            expenses = expenses.filter(currentExpense => 
                currentExpense.id !== expense.id);
            renderExpenses();
        });
    });
    updateTotals(filteredExpenses);
    updateCategoryTotals(filteredExpenses);
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

const updateTotals = (expenses) => {
    let totalAmount = expenses.reduce((acc, expense) => 
        acc + expense.amount, 0);
    overallTotal.textContent = totalAmount;
    expenseCount.textContent = expenses.length;
};

const updateCategoryTotals = (expenses) => {
    const totals = {};
    expenses.forEach(expense => {
        if (!totals[expense.category]) {
            totals[expense.category] = 0;
        }

        totals[expense.category] += expense.amount;
    }) 
    
    categoryTotals.innerHTML = "";
    Object.entries(totals).forEach(([category, amount]) => {
        const totalItem =
            document.createElement("p");
        totalItem.textContent =
            `${category}: $${amount}`;
        categoryTotals.appendChild(totalItem);
    });
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

categoryFilter.addEventListener("change", (event) => {
    selectedCategory = event.target.value;
    console.log(selectedCategory);
    renderExpenses();
});



