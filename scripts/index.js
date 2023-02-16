const countrySearchInput = document.querySelector('.search__input');
const countrySearchBtn = document.querySelector('.search__button');
const listContainer = document.querySelector('.countries__list');
const template = document.querySelector('.template');

const searchBtn = document.querySelector('#search-btn');
const searchCountryForm = document.querySelector('.search__country');
const regionSelect = document.querySelector('#region-select');
const themeBtn = document.querySelector('.header__theme-button');
const resetBtn = document.querySelector('.reset');

window.addEventListener('DOMContentLoaded', setupCountres);
searchCountryForm.addEventListener('submit', searchByName);
regionSelect.addEventListener('change', searchByRegion);
themeBtn.addEventListener('click', changeTheme);
resetBtn.addEventListener('click', resetPage);


//fetch
function setupCountres() {
    fetch('https://restcountries.com/v2/all')
    .then(res => {
            return res.json();
        })
    .then((data) => {
          renderItemsList(data);
    });
}

function findCountryByName(name) {
    fetch(`https://restcountries.com/v2/name/${name}`)
    .then(res => {
            return res.json();
        })
    .then((data) => {
          renderItemsList(data);
    });
}

function findCountriesByRegion(region) {

    fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(res => {
            return res.json();
        })
    .then((data) => {
          renderItemsList(data);
    });
}

//render Items List
function renderItemsList(items) {
    items.forEach((item) => {
      const newItem = composeItem(item);
      listContainer.append(newItem);
    });
}

function composeItem(item){
    const newItem = template.content.cloneNode(true);

    const flag = newItem.querySelector('.card__flag-img');
    flag.src=`${item.flags.png}`;

    const name = typeof item.name === 'string' ? item.name : item.name.common;
    const descName = newItem.querySelector('.card__desc-name');
    descName.textContent = name;

    let population = item.population.toLocaleString();
    const descPopulation = newItem.querySelector('.card__desc-population');
    descPopulation.textContent = `Population: ${population}`;

    const descRegion = newItem.querySelector('.card__desc-region');
    descRegion.textContent = `Region: ${item.region}`;

    const descCapital = newItem.querySelector('.card__desc-capital');
    descCapital.textContent = `Capital: ${item.capital}`;

    return newItem;
}

//search By ...

function searchByName(evt) {
    evt.preventDefault();

    const input = countrySearchInput.value;
        if(input !== ''){
            findCountryByName(input);
            listContainer.innerHTML = '';
            regionSelect.value = "filter";
        }   
}

function searchByRegion() {

    const region = regionSelect.value;

    findCountriesByRegion(region);
    countrySearchInput.value = '';
    listContainer.innerHTML = '';
}

// changeTheme
function changeTheme(){

    const body = document.querySelector('.light-theme');
    body.classList.toggle('dark-theme');

    if(body.classList.contains('dark-theme')){
        const btnImg = document.querySelector('.header__btn-img');
        btnImg.src = 'img/sun.svg';
        const themeText = document.querySelector('.header__theme-text');
        themeText.textContent = 'Light mode';
    }
    if(!body.classList.contains('dark-theme')){
        const btnImg = document.querySelector('.header__btn-img');
        btnImg.src = 'img/moon.svg';
        const themeText = document.querySelector('.header__theme-text');
        themeText.textContent = 'Dark mode';
    }
}

// resetPage
function resetPage() {
    setupCountres();
    listContainer.innerHTML = '';
    countrySearchInput.value = '';
    regionSelect.value = "filter";
}