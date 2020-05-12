// Этот модуль юудет контролировать все процессы приложения, cj.snbz? 
let controller = (function(budgetController, uiCtrl) {

    let DOM = uiCtrl.getDomStrings();
    // Функция которая срабатывает при отправке формы
    function ctrlAddItem(event) {
        event.preventDefault();
        
        // 1. Получать данные из формы
        let input = uiCtrl.getInput();
        console.log(input);

        
        // 2. Добавлять данные из формы в модель
        // 3. Доюавлять запись из формы в UI
        // 4. Посчитать в бюджет
        // 5. Отобразить бюджет в UI
    }
    
    document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);

})(modelController, viewController);