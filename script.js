const expenseForm = document.querySelector("#form")

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

expenseForm.addEventListener("submit", (event) => {
   event.preventDefault();
   console.log("Form submitted");
});

renderExpenses();

let expenses = [];
