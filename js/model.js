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
        // Если массив не пустой то определяем ID  если пустой то ID=0
        if(data.allItems[type].length > 0) {
            // Находим последний индекс массива(длинна массива - 1)
            lastIndex = data.allItems[type].length - 1;
            // Определяем ID последнего элемента( определяем элемент массива по последнему индексу и прибавляем 1 тем самым определяя следуйщий ID)
            ID = data.allItems[type][lastIndex].id + 1;
        } else {
            ID = 0;
        }
        
        // Проверяем какой тип к нам пришел (доход или расход)
        if (type === "inc") {
            newItem = new Income(ID, desc, val);
        } else if (type === "exp") {
            newItem = new Expense(ID, desc, val);
        }
        // Записываем "запись"/обьект в нашу структуру данных
        data.allItems[type].push(newItem);
        // Возвращаем новый обьект
        // Мы возвращаем newItem для того что бы на его основе обновить разметку
        return newItem;
    }

    // Структура данных о расходах и доходах каждого действия и общие доходы и рассходы
    // Тут будут хранится все данные касаемые расходов и доходов нашего
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

    // Возвращаем ф-ю addItem в виде обьекта для того что бы обратится к нему в контроллере
    return {
        addItem: addItem,
        test: function() {
            console.log(data);
        }
    }

})();