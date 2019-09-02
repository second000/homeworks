'use strict';

let numbers = [5, 50, 500, 8, 80, 800];

console.log(numbers.slice(3, 6));

function slice(array, from = 0, to = (array.length - 1)) {
    let newArr = [];

    for (let i = from; i < to && i < (array.length - 1); i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

console.log(slice(numbers, 3, 6));