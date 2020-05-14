// Этот модуль отвечает за внешний вид, за шаблон
let viewController = (function() {
    // в DOMstrings храняться все селекторы котрые понадаюятся нам для работы с приложением
    let DOMstrings = {
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: '#budget-form',
        incomeContainer: "#income__list",
        expenseContainer: "#expenses__list",
        budgetLabel: "#budget-value",
        incomeLabel: "#income-label",
        expanceLabel: "#expence-label",
        expancePercentLabel: "#expense-persent-label",
        budgetTable: "#budget-table",

    }

    // Метод который собирает данные из формы
    function getInput () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
    }

    // Метод с помощью которого мы будем вставлять "запись" в разметку
    // Принемает в себя обьект записи и тип(куда она относится в рассход или доход)


    function renderListItem(obj, type) {
        let containerElement, html;
        if(type === "inc") {
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
                        <div class="badge badge--dark">
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
        // Применяем встроенный метод replace для поиска и замены строки
        // Заменяем строки на нужные значения
        // Работаем с переменной newHtml переписывая ее раз за разом
        let newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", obj.value);


        document.querySelector(containerElement).insertAdjacentHTML("beforeend", newHtml);

    }

    // Ф-я которая будет очищать поля формы 
    function clearFields () {
        let inputDesc, inputVal;
        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = "";
        // Встроенный метод который вызывает фокус на выюранном поле
        inputDesc.focus();
        inputVal.value = "";

    }

    // Ф-я для отображения подсчитанных рассходов доходов и процентов в приложении
    function displayBudget(obj) {

        document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
        document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
        document.querySelector(DOMstrings.expanceLabel).textContent = obj.totalExp;

        if(obj.percentage > 0) {
            document.querySelector(DOMstrings.expancePercentLabel).textContent = obj.percentage;
        } else {
            document.querySelector(DOMstrings.expancePercentLabel).textContent = "--"
        }



    }
    // Ф-я для возврата из view.js 
    return {
        clearFields: clearFields,
        getInput: getInput,
        renderListItem: renderListItem,
        displayBudget: displayBudget,
        // Метод который возвращает селекторы
        getDomStrings: function() {
            return DOMstrings
        }
    }

})();