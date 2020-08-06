let viewController = (function () {
    let DOMstrings = {
        inputType: "#input__type",
        inputDescription: "#input__description",
        inputValue: "#input__value",
        form: "#budget-form",
        incomeContainer: "#income__list",
        expenseContainer: "#expenses__list",
        budgetLabel: "#budget-value",
        incomeLabel: "#income-label",
        expanceLabel: "#expence-label",
        expancePercentLabel: "#expense-persent-label",
        budgetTable: "#budget-table",
        monthLabel: "#month",
        yearLabel: "#year",
    };

    // A method that collects data from a form
    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        };
    }

    // Function for formatting numbers
    // Accepts the number and type of that number
    function formatNumber(num, type) {
        let numSplit;
        let int;
        let dec;
        let resultNumber;
        let newInt = "";

        // Letting go of the minus sign for negative numbers
        num = Math.abs(num); //Math.abs(-10) = 10

        // Bringing to two numbers after the dot
        num = num.toFixed(2); // 2.45678.toFixed(2) = 2.46 / 2.toFixed(2) = 2.00
        // Divide the number into two parts by 123000 => 123,000.00/ 123456789 => 123,456,789.00
        numSplit = num.split("."); // 45.78 => [45, 78]
        int = numSplit[0]; // whole part
        dec = numSplit[1]; // decimal part

        // Solve commas
        // Based on the length of the number, we divide it into parts of three digits
        // Starting from the right side, we put down commas after every third number
        // If the number is longer than three digits, then you need to put commas
        if (int.length > 3) {
            // A loop that determines how many commas to put
            for (let i = 0; i < int.length / 3; i++) {
                // We form a new line with a number
                newInt =
                    // Add a comma every three numbers
                    "," +
                    // Cut piece from original line
                    int.substring(int.length - 3 * (i + 1), int.length - 3 * i) +
                    // End of line first part
                    newInt;
            }

            // Remove the comma at the beginning, if any
            // If the first character of a string is equal to a comma, then return the string to us starting from the second character
            if (newInt[0] === ",") {
                newInt = newInt.substring(1);
            }
        } else if (int === "0") {
            // if the original number is zero, then write zero to a new line
            newInt = "0";
        } else {
            newInt = int;
        }

        resultNumber = newInt + "." + dec;

        if (type === "exp" && resultNumber != 0) {
            resultNumber = "- " + resultNumber;
        } else if (type === "inc") {
            resultNumber = "+ " + resultNumber;
        }

        return resultNumber;
    }

    // The method with which we will insert the "record" into the markup
    // Takes the record object and type (where it belongs to the expense or income)
    function renderListItem(obj, type) {
        let containerElement, html;
        if (type === "inc") {
            containerElement = DOMstrings.incomeContainer;
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
            <div class="item__title">%description%</div>
            <div class="item__right">
                <div class="item__amount">%value%</div>
                <button class="item__remove">
                    <img
                        src="./img/circle-green.svg"
                        alt="delete"
                    />
                </button>
            </div>
        </li>`;
        } else {
            containerElement = DOMstrings.expenseContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
            <div class="item__title">%description%</div>
            <div class="item__right">
                <div class="item__amount">
                    %value%
                    <div class="item__badge">
                        <div class="item__percent badge badge--dark">
                            15%
                        </div>
                    </div>
                </div>
                <button class="item__remove">
                    <img src="./img/circle-red.svg" alt="delete" />
                </button>
            </div>
        </li>`;
        }
        // Using the built-in replace method to find and replace a string
        // Replace strings with desired values
        let newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

        document.querySelector(containerElement).insertAdjacentHTML("beforeend", newHtml);
    }

    // Fгтсешщт which will clear form fields
    function clearFields() {
        let inputDesc, inputVal;
        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = "";
        // Built-in method that calls focus on the selected field
        inputDesc.focus();
        inputVal.value = "";
    }

    // Function for displaying the calculated expenses of income and interest in the application
    function displayBudget(obj) {
        const type = obj.budget > 0 ? "inc" : "exp";

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
        document.querySelector(DOMstrings.expanceLabel).textContent = formatNumber(obj.totalExp, "exp");

        if (obj.percentage > 0) {
            document.querySelector(DOMstrings.expancePercentLabel).textContent = obj.percentage + "%";
        } else {
            document.querySelector(DOMstrings.expancePercentLabel).textContent = "--";
        }
    }

    // Function to remove data from the screen
    function deleteListItem(itemID) {
        document.getElementById(itemID).remove();
    }

    // Function to display updated percentages in the model on the screen
    function updateItemsPercentages(items) {
        items.forEach(function (item) {
            // item => [exp-id, 26%]
            // Find a block with percentages inside the current record
            let el = document.getElementById(`exp-${item[0]}`).querySelector(".item__percent"); // li found then interest inside li

            // We check if the value% = "-1" when there is no income
            if (item[1] >= 0) {
                el.parentElement.style.display = "block";
                el.textContent = item[1] + "%";
            } else {
                el.parentElement.style.display = "none";
            }
        });
    }

    function displayMonth() {
        let now = new Date();
        let year = now.getFullYear(); // 2020
        let month = now.getMonth(); // returns month index 0 -> January etc.

        let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        month = monthArr[month];
        document.querySelector(DOMstrings.monthLabel).innerText = year;
        document.querySelector(DOMstrings.yearLabel).innerText = month;
    }

    // Function to return from view.js
    return {
        clearFields: clearFields,
        getInput: getInput,
        renderListItem: renderListItem,
        displayBudget: displayBudget,
        deleteListItem: deleteListItem,
        updateItemsPercentages: updateItemsPercentages,
        displayMonth: displayMonth,

        // Method that returns selectors
        getDomStrings: function () {
            return DOMstrings;
        },
    };
})();
