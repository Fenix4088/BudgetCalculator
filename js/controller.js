// Этот модуль юудет контролировать все процессы приложения, cj.snbz? 
let controller = (function(budgetController, uiCtrl) {

    
    let setupEventListeners = function () {
        // Получем значение getDomStrings в контроллере
        let DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);

        // Прослушка клика по #budget-table(таблица с доходами и расходами)
        document.querySelector(DOM.budgetTable).addEventListener("click", ctrlDeleteItem);

    }
    // Функция которая срабатывает при отправке формы
    function ctrlAddItem(event) {
        event.preventDefault();

        // 1. Получать данные из формы
        let input = uiCtrl.getInput();

        // Проверка на пустые поля перед началом работы
        // Проверяе введенено ли в поле с суммой число
        // И что введенное число юольше нуля
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Добавлять данные из формы в модель
            let newItem = budgetController.addItem(input.type, input.description, input.value);
            budgetController.test();
            // 3. Доюавлять запись из формы в UI
            uiCtrl.renderListItem(newItem, input.type);
            // Очистка полей формы после введения данных
            uiCtrl.clearFields();
            // Тестовая генерация значений в форме
            generateTestData.init();
            // 4. Посчитать в бюджет. Вызываем ф-ю для обновления общей суммы бюджета
            updateBudget();
        } 
       
    }

    // Ф-я которая будет заниматься удалением из таблица с доходами и расходами
    function ctrlDeleteItem (event) {
        let itemID, splitID, type, ID;
        // Проверяем действительно ли мы кликнули по кнопке удалить, а не почему то либо другому
        if(event.target.closest(".item__remove")) {
            // Находим родителя кнопки с тегом li
            // И сразу же обращаемся к его id
            itemID = event.target.closest("li.budget-list__item").id;
            // Метод split() разделяет строку на масси о заданому разделителю
            // ID эдемента inc-1/exp-1 разбиваеться на массив ["inc", "1"]
            splitID = itemID.split("-");
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // Вызываем Ф-ю удаления данных о доходах и расходах из модели
            budgetController.deleteItem(type, ID);
        }
    }
    
    // Ф-я для подсчета бюджета
    function updateBudget () {
        // 1. Расчитать бюджет в модели
        budgetController.calculateBudget();
        // 2. Получить расчитанный бюджет из модели
        let budgetObj = budgetController.getBudget();
        // 3. Отобразить весь бюджет в шаблоне
        uiCtrl.displayBudget(budgetObj);

    }
    
    return {
        init: function() {
            console.log("App started");
            setupEventListeners();
            uiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });

        }
    }

})(modelController, viewController);

controller.init();