/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
const addNameInput = homeworkContainer.querySelector('#add-name-input');
const addValueInput = homeworkContainer.querySelector('#add-value-input');
const addButton = homeworkContainer.querySelector('#add-button');
const listTable = homeworkContainer.querySelector('#list-table tbody');

document.addEventListener("DOMContentLoaded", () => {
    const fullCookies = cookieToObject();
    for (let value in fullCookies) {
        renderCookie(value, fullCookies[value]);
    }
});

filterNameInput.addEventListener('keyup', function() {
    listTable.innerHTML = '';
    const fullCookies = cookieToObject();
    const chunkCookies = filterNameInput.value;
    for (let value in fullCookies) {
        console.log(chunkCookies);
        if ((value === chunkCookies) || (fullCookies[value] === chunkCookies)) {
            renderCookie(value, fullCookies[value]);
        }
        if (chunkCookies === ''){
            renderCookie(value, fullCookies[value]);
        }
    }
});

addButton.addEventListener('click', () => {
    addCookie();
    listTable.innerHTML = '';
    const fullCookies = cookieToObject();
    for (let value in fullCookies) {
        renderCookie(value, fullCookies[value]);
    }
});

function addCookie() {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
}

function renderCookie(name, value) {
    const cookieRow = document.createElement('tr');
    const cookieDataName = document.createElement('td');
    const cookieDataValue = document.createElement('td');
    const cookieDataDelete = document.createElement('td');
    const deleteButton = document.createElement('button');

    cookieDataName.innerText = `${name}`;
    cookieDataValue.innerText = `${value}`;
    deleteButton.innerText = 'удалить cookie';
    deleteButton.addEventListener('click', function () {
        document.cookie = `${name}=${value};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        listTable.removeChild(cookieRow);
    });
    cookieRow.appendChild(cookieDataName);
    cookieRow.appendChild(cookieDataValue);
    cookieRow.appendChild(cookieDataDelete);
    cookieDataDelete.appendChild(deleteButton);
    listTable.appendChild(cookieRow);
}

function cookieToObject() {
    const cookiesObj = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev;
    }, {});
    return cookiesObj;
}