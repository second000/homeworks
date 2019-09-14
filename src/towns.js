/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns(url) {
    return new Promise(function (resolve) {
        fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
            .then(response => {

                return response.json();
            })
            .then(data => {
                let towns = data.sort(function(a, b) {

                    if (a.name < b.name) {

                        return -1;
                    }
                    if (a.name > b.name) {

                        return 1;
                    }

                    return 0;
                });

                resolve(towns);
            })
            .catch(() => {
                loadingBlock.style.display = 'none';
                errorBlock.style.display = '';
                errorButton.addEventListener('click', () => loadTowns(url));
            });
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let filter = full.toUpperCase().indexOf(chunk.toUpperCase());

    if (filter === -1) {
        return false;
    }

    return true;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Блок ошибки при загрузке */
const errorBlock = homeworkContainer.querySelector('#error-block');
/* Кнопка повторной загрузки */
const errorButton = homeworkContainer.querySelector('#error-button');
/* url для скачивания городов */
let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

loadTowns(url)
    .then(towns => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = '';
        filterInput.addEventListener('keyup', function() {
            let chunk = filterInput.value;

            for (let town of towns) {
                if (isMatching(town.name, chunk)) {
                    filterResult.style.display = '';
                    const townNode = createTownNode(town);

                    filterResult.appendChild(townNode);
                }
                if (chunk === '') {
                    filterResult.innerHTML = '';
                }
            }
        });
    });

function createTownNode(town) {
    const townDiv = document.createElement('div');

    townDiv.textContent = town.name;

    return townDiv;
}

export {
    loadTowns,
    isMatching
};
