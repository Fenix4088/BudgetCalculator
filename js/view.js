// Этот модуль отвечает за внешний вид, за шаблон
let viewController = (function() {
    // в DOMstrings храняться все селекторы котрые понадаюятся нам для работы с приложением
    let DOMstrings = {
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: '#budget-form'
    }

    return {
        // Метод который возвращает данные из формы
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        // Метод который возвращает селекторы
        getDomStrings: function() {
            return DOMstrings
        }
    }

})();