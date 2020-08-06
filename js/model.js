// Этот модуль отвечает за данные нашего приложения
let modelController = (function () {
    // Constructor for income, writes property data of objects
    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Constructor for expenses, writes data of properties of objects
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        // Percentages will be written here, -1 is not a value, this is a flag that says that percentages have not been set yet
        this.percentage = -1;
    };

    // For each object of type Expense, we create a method that will calculate how many percent it is from the total income
    // Function receives total income
    Expense.prototype.calcProsenteage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    // Create a method that returns a value from the prototype
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    // Function that starts the recalculation of interest for all expenses
    function calculatePercentages() {
        data.allItems.exp.forEach(function (item) {
            item.calcProsenteage(data.totals.inc);
        });
    }

    // Function that will return a list of id and a list of percentages that we need to update in the view
    function getAllIdsAndPersentages() {
        // [[id, percentage], [id, percentage], [id, percentage]]
        let allPerc = data.allItems.exp.map(function (item) {
            return [item.id, item.getPercentage()];
        });
        return allPerc;
    }

    function addItem(type, desc, val) {
        let newItem;
        let ID = 0;
        // We generate an ID
        // If the array is not empty then we define ID if empty then ID = 0
        if (data.allItems[type].length > 0) {
            // Find the last index of the array (array length - 1)
            const lastIndex = data.allItems[type].length - 1;
            // Determine the ID of the last element (we determine the element of the array by the last index and add 1 thereby determining the next ID)
            ID = data.allItems[type][lastIndex].id + 1;
        }

        // We check what type came to us (income or expense)
        if (type === "inc") {
            // parseFloat () converts a string to float
            newItem = new Income(ID, desc, parseFloat(val));
        } else if (type === "exp") {
            newItem = new Expense(ID, desc, parseFloat(val));
        }
        // We write "record" / object to our data structure
        data.allItems[type].push(newItem);
        // Returning a new object
        // We return newItem in order to update the markup based on it
        return newItem;
    }

    // Function removing income and expense data from the model
    function deleteItem(type, id) {
        const index = data.allItems[type].findIndex((item) => item.id === id);
        //We delete (splice (where we start deleting from, at what index, how many elements to delete))
        // Condition, if an element of the array is not found, then we delete it
        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
    }

    // Function which will return the sum of all income and expenses
    // Depending on what we will apply it to
    function calculateTotalSum(type) {
        let sum = 0;
        data.allItems[type].forEach(function (item) {
            sum = sum + item.value;
        });
        return sum;
    }

    // Function which will calculate the total budget
    function calculateBudget() {
        data.totals.inc = calculateTotalSum("inc");
        data.totals.exp = calculateTotalSum("exp");

        // Calculating the total budget
        data.budget = data.totals.inc - data.totals.exp;

        // We calculate the percentage for expenses
        // We provide when incomes are equal to zero but there are expenses
        // If the income is equal to 0 and there are no expenses, then we will have a division by zero and this will cause an error
        if (data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }
    }

    // Function which will return the budget from the model
    function getBudget() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage,
        };
    }

    // Cost and Income Data Structure for Each Activity and Total Income and Expenses
    // All data regarding the expenses and income of our
    let data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0,
        },
        budget: 0,
        percentage: -1,
    };

    // We return function addItem as an object in order to refer to it in the controller
    return {
        addItem: addItem,
        deleteItem: deleteItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        calculatePercentages: calculatePercentages,
        getAllIdsAndPersentages: getAllIdsAndPersentages,
        test: function () {
            console.log(data);
        },
    };
})();
