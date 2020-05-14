
let generateTestData = (function () {

    let ExampleItem = function(type, desc, sum) {
        this.type = type;
        this.desc = desc;
        this.sum = sum;
    }
        
    let testData = [
        new ExampleItem("inc", "Slary", 1245),
        new ExampleItem("inc", "Freelance", 820),
        new ExampleItem("inc", "Partner program", 110),
        new ExampleItem("inc", "Sale digital", 90),

        new ExampleItem("exp", "Paments", 400),
        new ExampleItem("exp", "Patrol", 60),
        new ExampleItem("exp", "Market", 300),
        new ExampleItem("exp", "Fun", 100)
    ];


    function getRandomInt (max) {
        return Math.floor(Math.random() * max)
    }


    function insertInUI () {
        let random = getRandomInt(testData.length);
        let randomItem = testData[random];

        document.querySelector('#input__type').value = randomItem.type;
        document.querySelector('#input__description').value = randomItem.desc;
        document.querySelector('#input__value').value = randomItem.sum;
    }

    return {
        init: insertInUI
    }

})();


generateTestData.init();
    