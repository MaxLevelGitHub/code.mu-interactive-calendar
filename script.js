// Получаем элементы DOM
let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');
let info = document.querySelector('.info');

// Устанавливаем текущую дату
let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();

// Отрисовываем календарь на основе текущей даты
draw(body, year, month);

// Функция для отрисовки календаря
function draw(body, year, month) {
    let arr = range(getLastDay(year, month));
    
    let firstWeekDay = getFirstWeekDay(year, month);
    let lastWeekDay  = getLastWeekDay(year, month);
    
    let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
    
    createTable(body, nums)
}

// Функция для создания таблицы и заполнения ее числами
function createTable(parent, arr) {
    parent.textContent = '';
    let cells = [];
    
    for (let sub of arr) {
        let tr = document.createElement('tr');
        
        for (let num of sub) {
            let td = document.createElement('td');
            td.textContent = num;
            tr.appendChild(td);
            
            cells.push(td);
        }
        
        parent.appendChild(tr);
    }
    
    return cells;
}

// Функция для нормализации массива чисел
function normalize(arr, left, right) {
    for (let i = 0; i < left; i++) {
        arr.unshift('');
    }
    for (var i = 0; i < right; i++) {
        arr.push('');
    }
    
    return arr;
}

// Функция для получения первого дня недели для текущего месяца
function getFirstWeekDay(year, month) {
    let date = new Date(year, month, 1);
    let num  = date.getDay();
    
    if (num == 0) {
        return 6;
    } else {
        return num - 1;
    }
}

// Функция для получения последнего дня недели для текущего месяца
function getLastWeekDay(year, month) {
    let date = new Date(year, month + 1, 0);
    let num  = date.getDay();
    
    if (num == 0) {
        return 6;
    } else {
        return num - 1;
    }
}

// Функция для получения количества дней в текущем месяце
function getLastDay(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

// Функция для создания массива чисел от 1 до count
function range(count) {
    let arr = [];
    
    for (let i = 1; i <= count; i++) {
        arr.push(i);
    }
    
    return arr;
}

// Функция для разбиения массива на подмассивы длиной n
function chunk(arr, n) {
    let result = [];
    let count = Math.ceil(arr.length / n);
    
    for (let i = 0; i < count; i++) {
        let elems = arr.splice(0, n);
        result.push(elems);
    }
    
    return result;
}

// Добавляем обработчики кликов на стрелки
prev.addEventListener('click', function() {
    // Получаем предыдущий год и месяц
    const prevYearMonth = getPrevYearMonth(year, month);
    year = prevYearMonth.year;
    month = prevYearMonth.month;
    
    // Отрисовываем новый календарь
    draw(body, year, month);
    
    // Обновляем информацию
    updateInfo();
});

next.addEventListener('click', function() {
    // Получаем следующий год и месяц
    const nextYearMonth = getNextYearMonth(year, month);
    year = nextYearMonth.year;
    month = nextYearMonth.month;
    
    // Отрисовываем новый календарь
    draw(body, year, month);
    
    // Обновляем информацию
    updateInfo();
});

// Функция для получения предыдущего года и месяца
function getPrevYearMonth(year, month) {
    if (month == 0) {
        return {year: year - 1, month: 11};
    } else {
        return {year: year, month: month - 1};
    }
}

// Функция для получе
function getNextYearMonth(year, month) {
    if (month == 11) {
        return {year: year + 1, month: 0};
    } else {
        return {year: year, month: month + 1};
    }
}

// Функция для получения названия месяца по номеру
function getMonthName(month) {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return months[month];
}

// Обновляем информацию о текущем месяце и годе
function updateInfo() {
    const monthName = getMonthName(month);
    info.textContent = `${monthName} ${year}`;
}

