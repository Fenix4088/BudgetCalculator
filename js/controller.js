let controller = (function (budgetController, uiCtrl) {
    let setupEventListeners = function () {
        // Get the getDomStrings value in the controller
        let DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);

        //click on # budget-table (table with income and expenses)
        document.querySelector(DOM.budgetTable).addEventListener("click", ctrlDeleteItem);
    };

    // Calculating and updating percentages in the expense table
    function updatePersentages() {
        // Calculate the percentages for each Expense record
        budgetController.calculatePercentages();

        // Get data on percentages from the model as an array
        let idsAndPercents = budgetController.getAllIdsAndPersentages();

        // Update the UI with new percentages, which takes the calculations from the model
        uiCtrl.updateItemsPercentages(idsAndPercents);
    }

    // Function that fires when the form is submitted
    function ctrlAddItem(event) {
        event.preventDefault();

        // 1. Receive data from a form
        let input = uiCtrl.getInput();

        // Checking for empty fields before starting work
        // Check if a number is entered in the field with the amount
        // And that the entered number is greater than zero
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add data from a form to a model
            let newItem = budgetController.addItem(input.type, input.description, input.value);
            // 3. Add form entry to UI
            uiCtrl.renderListItem(newItem, input.type);
            // Clearing form fields after entering data
            uiCtrl.clearFields();
            // Test generation of values ​​in a form
            generateTestData.init();
            // 4. Calculate to budget. We call function to update the total budget
            updateBudget();

            // 5. Updating the budget percentage
            updatePersentages();
        }
    }

    // Function which will deal with the removal from the table with income and expenses
    function ctrlDeleteItem(event) {
        let itemID;
        let splitID;
        let type;
        let ID;
        // We check whether we really clicked on the delete button, and not for some reason or another
        if (event.target.closest(".item__remove")) {
            // Finding the parent of the button with the li tag
            // And immediately refer to its id
            itemID = event.target.closest("li.budget-list__item").id; // inc-0
            splitID = itemID.split("-"); //"inc-0" => ["inc", "0"]
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // const [type, ID] = itemID.split("-");
            //removing income and expense data from the model
            budgetController.deleteItem(type, ID);
            // deleting income and expenses data from view
            uiCtrl.deleteListItem(itemID);

            // Updating the budget after deletion
            updateBudget();

            //  Updating the budget percentage
            updatePersentages();
        }
    }

    // Function for calculating the budget
    function updateBudget() {
        // 1. Calculate budget in model
        budgetController.calculateBudget();
        // 2. Get the calculated budget from the model
        let budgetObj = budgetController.getBudget();
        // 3. Display the entire budget in the template
        uiCtrl.displayBudget(budgetObj);
    }

    return {
        init: function () {
            console.log("App started");
            uiCtrl.displayMonth();
            setupEventListeners();
            uiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
            });
        },
    };
})(modelController, viewController);

controller.init();
