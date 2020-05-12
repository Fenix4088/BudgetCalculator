// Этот модуль отвечает за данные нашего приложения
let modelController = (function() {
    // Конструктор для доходов, записывает данные свойства обьектов
    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // Конструктор для расходов, записывает данные свойства обьектов
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    function addItem(type, desc, val) {
        let newItem, ID, lastIndex;

        // Генерируем ID
        if(data.allItems[type].length > 0) {
            lastIndex = data.allItems[type].length - 1;
            ID = data.allItems[type][lastIndex].id + 1;
        } else {
            ID = 0;
        }
        
        // В зависимости от типа записи используем сооьветствующий конструктор и создаем обьект
        if (type === "inc") {
            newItem = new Income(ID, desc, val);
        } else if (type === "exp") {
            newItem = new Expense(ID, desc, val);
        }
        // Записываем  "запись" / обьект в нашу структуру данных
        data.allItems[type].push(newItem);

        // Возвращаем новый обьект
        return newItem;
    }

    let data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    }

    return {
        addItem: addItem,
        test: function() {
            console.log(data);
        }
    }

})();