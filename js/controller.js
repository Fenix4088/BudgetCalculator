// Этот модуль юудет контролировать все процессы приложения, cj.snbz? 
let controller = (function(budgetController, uiCtrl) {

    
    let setupEventListeners = function () {
        let DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);
    }
    // Функция которая срабатывает при отправке формы
    function ctrlAddItem(event) {
        event.preventDefault();

        // 1. Получать данные из формы
        let input = uiCtrl.getInput();
        console.log(input);

        // 2. Добавлять данные из формы в модель
        budgetController.addItem(input.type, input.description, input.value);
        budgetController.test();
        // 3. Доюавлять запись из формы в UI
        // 4. Посчитать в бюджет
        // 5. Отобразить бюджет в UI
    }
    
    return {
        init: function() {
            console.log("App started");
            setupEventListeners();
        }
    }

})(modelController, viewController);

controller.init();