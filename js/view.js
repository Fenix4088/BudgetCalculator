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
        monthLabel: "#month",
        yearLabel: "#year",

    }

    // Метод который собирает данные из формы
    function getInput () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        }

    // Ф-я для форматирования чисел
    // Принемает число и тип этого числа
    function formatNumber(num, type) {
        let numSplit, int, dec, resultNumber;
        let newInt = "";

        // Уюираем знак минус у отрицательных чисел
        num = Math.abs(num); //Math.abs(-10) = 10

        // Приводим к двум цифрам после точки
        num = num.toFixed(2); // 2.45678.toFixed(2) = 2.46 / 2.toFixed(2) = 2.00
        // Разделяем число на две части на 123000 => 123,000.00/ 123456789 => 123,456,789.00
        numSplit = num.split("."); // 45.78 => [45, 78]
        int = numSplit[0]; // целая часть
        dec = numSplit[1]; // десятичная часть

        // Раставляем запятые
        // Исходя из длинны числа мы делим его на части по три цифры
        // Начиная с правой стороны проставляем запятые после каждого третьего числа
        // Если длинна номера больше чем три цифры значит нужно ставить запятые
        if(int.length > 3) {
            console.log("formatNumber -> int.length", int.length)
            // Цикл который определяет сколько запятых необходимо поставить
            for(let i = 0; i < int.length / 3; i++ ) {
                // Формируем новую строку с номером
                newInt = 
                // Добавляем запятую каждые три числа
                "," +
                // Вырезанный кусок из исходной строки 
                int.substring(int.length - 3 * (i + 1), int.length - 3 * i) + 
                // Конец строки первая часть
                newInt;
                console.log("formatNumber -> newInt", newInt)

            }
            console.log("formatNumber -> newInt", newInt)

            // Убираем запятую в начале, если она есть
            // Если у строки первый символ равен запятой то верни нам строку начиная со второго символа
            if(newInt[0] === ",") {
                newInt = newInt.substring(1);
                console.log(newInt);
            }

        } else if(int === "0") { 
            // если исходное число равно нулю, то в новую строку записываем ноль
            newInt = "0";
        } else {
            newInt = int;
        }
        
        resultNumber = newInt + "." + dec;

        if(type === "exp") {
            resultNumber = "- " + resultNumber;
        } else if (type === "inc") {
            resultNumber = "+ " + resultNumber;

        }

        return resultNumber;
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
        // Применяем встроенный метод replace для поиска и замены строки
        // Заменяем строки на нужные значения
        // Работаем с переменной newHtml переписывая ее раз за разом
        let newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));


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
        
        let type;
        if (obj.budget > 0) {
            type = "inc";
        } else {
            type = "exp";
        }

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
        document.querySelector(DOMstrings.expanceLabel).textContent = formatNumber(obj.totalExp, "exp");

        if(obj.percentage > 0) {
            document.querySelector(DOMstrings.expancePercentLabel).textContent = obj.percentage + "%";
        } else {
            document.querySelector(DOMstrings.expancePercentLabel).textContent = "--"
        }



    }

    // Ф-я для удаления данных с экрана 
    function deleteListItem(itemID) {
        document.getElementById(itemID).remove();
    }

    // Ф-я для вывода обновленных в моделе процентов на экран
    function updateItemsPercentages(items) {
        items.forEach( function(item) {
        console.log("updateItemsPercentages -> item", item);
        // item => [exp-id, 26%]
        // Находим блок с процентами внутри текущей записи
        let el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent'); // li нашли затем проценты внутри li


        // Делаем проверку если значение % = "-1" когда нет доходов
        if(item[1] >= 0) {
            el.parentElement.style.display = "block";
            el.textContent = item[1] + "%";
        } else {
            el.parentElement.style.display = "none";
        }

        })
    }

    function displayMonth() {
        let now = new Date();
        let year = now.getFullYear(); // 2020
        let month = now.getMonth(); // возвращает индекс месяца 0 -> Январь и т.д.

        let monthArr = [
            "Январь", "Февраль", "Март", 
            "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", 
            "Октябрь", "Ноябрь", "Декабрь"
        ];

        month = monthArr[month];
        document.querySelector(DOMstrings.monthLabel).innerText = year;
        document.querySelector(DOMstrings.yearLabel).innerText = month;
    }
    
    // Ф-я для возврата из view.js 
    return {
        clearFields: clearFields,
        getInput: getInput,
        renderListItem: renderListItem,
        displayBudget: displayBudget,
        deleteListItem: deleteListItem,
        updateItemsPercentages: updateItemsPercentages,
        displayMonth: displayMonth,
        
        // Метод который возвращает селекторы
        getDomStrings: function() {
            return DOMstrings
        }
    }

})();