/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */



// New Project

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const mS = ()=> {
    movieDB.movies.sort();
};

let binBin = () => {
    document.querySelectorAll('.delete').forEach ((item)=> {
        item.addEventListener ('click', (e)=> {
            e.preventDefault();
            item.parentElement.remove();
            movieDB.movies.pop ();
            console.log (movieDB.movies);
        });
    });
};

// Скрипт для перебора списка фильмов
let mainList = document.querySelector ('.promo__interactive-list');

const listChenger = ()=> {
    mS();
    mainList.innerHTML = "";
    movieDB.movies.forEach ((film, i)=>{
        if (film.length >= 15) {
            mainList.innerHTML +=  `<li class="promo__interactive-item">${i+1}: ${film.slice (0, 15)}...
                                        <div class="delete"></div>
                                    </li>`;
        }else {
            mainList.innerHTML += ` <li class="promo__interactive-item">${i+1}: ${film}
                                        <div class="delete"></div>
                                    </li>`;
        }
    });
    binBin();
};

// Ивент срабатывает при загрузки DOM-дерева
// Выполняет действия предыдущего урока
document.addEventListener ('DOMContentLoaded', ()=> {
    document.querySelectorAll('img').forEach ((item) =>{
        item.remove();
    });
    document.querySelector ('.promo__genre').textContent = "Драма";
    document.querySelector ('.promo__bg').style.backgroundImage = 'url("../img/bg.jpg")';
    mS ();
    listChenger ();
});

let butt = document.querySelector("button");

butt.addEventListener("click", (e)=>{
    e.preventDefault();
    let inVal = document.querySelector('.adding__input').value;
    movieDB.movies.push(inVal[0].toUpperCase() + inVal.slice(1));                           //Первый символ в верхний регистр
    if (document.querySelector ('input[type=checkbox]:checked')){
        document.querySelector ('input[type=checkbox]:checked').checked = '';
        if (inVal == ""){
            alert ('Введите название фильма!!!!');
            movieDB.movies.pop(0);
        }else {
            console.log ("Добавляем любимый фильм");
        }
    }else if (inVal == "") {
        alert ('Введите название фильма!!!!');
        movieDB.movies.pop(0);
    }
    mainList.innerHTML = "";
    listChenger();
    document.querySelector('.adding__input').value = '';
    console.log (movieDB.movies);
});