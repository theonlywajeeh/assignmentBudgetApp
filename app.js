var budget = 0;
var expenses = [];

function addExpense() {
        var description = document.getElementById("description").value;
        var amount = parseInt(document.getElementById("amount").value);
        var date = document.getElementById("date").value;
        var category = document.getElementById("category").value;

        if (isNaN(amount)) {
                showError("Please enter a valid amount.");
                return;
        }

        var userExpense = {
                description: description,
                amount: amount,
                date: date,
                category: category
        };
        expenses.push(userExpense);

        // Clear input fields
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("date").value = "";
        document.getElementById("category").selectedIndex = 0;

        showExpenses();
        calculateRemainingBudget();
        clearError();
}

function showExpenses() {
        var expenseList = document.getElementById("expenseList");
        expenseList.innerHTML = "";

        expenses.forEach(function (expense) {
                var listItem = document.createElement("li");
                listItem.className = "expense-item";

                var expenseInfo = document.createElement("div");
                expenseInfo.innerHTML = "<p><strong>Date: </strong>" + expense.date + "</p>" +
                        "<p><strong>Category: </strong>" + expense.category + "</p>" +
                        "<p><strong>Amount: </strong>$" + expense.amount + "</p>" +
                        "<p><strong>Description: </strong>" + expense.description + "</p>";

                listItem.appendChild(expenseInfo);
                expenseList.appendChild(listItem);
        });
}

function calculateRemainingBudget() {
        var totalExpense = expenses.reduce(function (acc, expense) {
                return acc + expense.amount;
        }, 0);

        var remainingBudget = budget - totalExpense;
        var remainingBudgetElement = document.getElementById("remainingBudget");

        remainingBudgetElement.textContent = "Remaining Budget: $" + remainingBudget.toFixed(2);
}

function showError(message) {
        var errorElement = document.createElement("p");
        errorElement.className = "error-message";
        errorElement.textContent = message;

        var container = document.querySelector(".container");
        container.insertBefore(errorElement, container.firstChild);
}

function clearError() {
        var errorElement = document.querySelector(".error-message");
        if (errorElement) {
                errorElement.remove();
        }
}

function updateBudget() {
        budget = parseInt(document.getElementById("inputBudget").value);
        calculateRemainingBudget();
}

document.getElementById("inputBudget").addEventListener("change", updateBudget);