const expenseForm = document.querySelector("#expense-form")

const descriptionInput = document.querySelector("#description");

const amountInput = document.querySelector("#amount");

const categoryInput = document.querySelector("#category");

const dateInput = document.querySelector("#date");

const expenseList = document.querySelector("#expense-list");

const overallTotal = document.querySelector("#overall-total");

const expenseCount = document.querySelector("#expense-count");

const errorMessage = document.querySelector("#error-message");

function renderExpenses() {
    expenseList.innerHTML = "";
}

renderExpenses();


expenseForm.addEventListener("submit", (event) => {
   event.preventDefault();
   console.log("Form submitted");
});


const description = descriptionInput.value;
const amount = Number(amountInput.value);
const category = categoryInput.value;
const date = dateInput.value;

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
}

let expenses = [];
