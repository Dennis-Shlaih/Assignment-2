// ====================
// DOM ELEMENTS
// ====================

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

const sortControl = document.querySelector("#sort-expenses")

const emptyState = document.querySelector("#empty-state");


// ====================
// Applocate State
// ====================

let expenses = [];

let selectedCategory = "All"

let selectedSort = "date-descending"


// ====================
// HELPER FUNCTIONS
// ====================

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

const sortExpenses = (expenses) => {
    if (selectedSort === "date-descending") {
        return expenses.sort((a, b) =>
            new Date(b.date) - new Date(a.date));
    }
    if (selectedSort === "date-ascending") {
        return expenses.sort((a, b) =>
            new Date(a.date) - new Date(b.date));    
    }
    if (selectedSort === "amount-descending") {
        return expenses.sort((a, b) => 
            b.amount - a.amount);
    }
    if (selectedSort === "amount-ascending") {
        return expenses.sort((a, b) => 
            a.amount - b.amount);
    }
};

// ====================
// UI FUNCTIONS
// ====================

const updateTotals = (expenses) => {
    let totalAmount = expenses.reduce((acc, expense) => 
        acc + expense.amount, 0);
    overallTotal.textContent =`$${totalAmount.toFixed(2)}`;
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
            `${category}: $${amount.toFixed(2)}`
        categoryTotals.appendChild(totalItem);
    });
};

const renderExpenses = () => {
    expenseList.innerHTML = "";
    let filteredExpenses = expenses;
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
    let displayedExpenses = sortExpenses([...filteredExpenses]);
    displayedExpenses.forEach(expense => {
        const expenseCard = document.createElement("div");
        const description = document.createElement("span");
        description.textContent = expense.description;
        const amount = document.createElement("span");
        amount.textContent = `$${expense.amount.toFixed(2)}`;
        const category = document.createElement("span");
        category.textContent = expense.category;
        const date = document.createElement("span");
        date.textContent = expense.date;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        expenseCard.append(
            description,
            amount,
            category,
            date,
            deleteButton
        );
        expenseList.appendChild(expenseCard);
        deleteButton.addEventListener("click", () => {
            expenses = expenses.filter(currentExpense => 
                currentExpense.id !== expense.id);
            renderExpenses();
        });
    });
    updateTotals(displayedExpenses);
    updateCategoryTotals(displayedExpenses);
};

// ====================
// EVENT LISTENERS
// ====================

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
    renderExpenses();
});

sortControl.addEventListener("change", (event) => {
    selectedSort = event.target.value;
    renderExpenses();
})



