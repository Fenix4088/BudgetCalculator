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
                                            // parseFloat() преобразует строку в число с плавающей точкой
            newItem = new Income(ID, desc, parseFloat(val));
        } else if (type === "exp") {
            newItem = new Expense(ID, desc, parseFloat(val));
        }
        // Записываем "запись"/обьект в нашу структуру данных
        data.allItems[type].push(newItem);
        // Возвращаем новый обьект
        // Мы возвращаем newItem для того что бы на его основе обновить разметку
        return newItem;
    }

    // Ф-я удаления данных о доходах и расходах из модели
    function deleteItem (type, id) {
        
    }

    // Ф-я которая будет возвращать сумму всех доходов и рассходов 
    // В зависимости от того к чему мы будем ее применять
    function calculateTotalSum(type) {
        let sum = 0;
        data.allItems[type].forEach( function(item) {
            sum = sum + item.value;
        });
        return sum;
    }

    // Ф-я которая будет подсчитывать общий бюджет
    function  calculateBudget() {
        data.totals.inc = calculateTotalSum('inc');
        data.totals.exp = calculateTotalSum('exp');

        // Расчет общего бюджета
        data.budget = data.totals.inc - data.totals.exp;

        // Считаем процент для расходов
        // Предусматриваем когда доходы равны нулю но рассходы есть
        // Если доход будет равен 0 а рассходы нет то у нас будет деление на ноль и это вызовет ошибку
        if(data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }
                
    }

    // Ф-я котора будет возвращать бюджет из модели
    function getBudget() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
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
        },
        budget: 0,
        percentage: -1
    }

    // Возвращаем ф-ю addItem в виде обьекта для того что бы обратится к нему в контроллере
    return {
        addItem: addItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        test: function() {
            console.log(data);
        }
    }

})();