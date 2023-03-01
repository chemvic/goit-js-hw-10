import './css/styles.css';
import { debounce } from 'throttle-debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputEl.addEventListener('input', onSearch);

function onSearch(event) {
    event.preventDefault();

    const inputData = event.currentTarget.value;
    console.log(inputData);

    const url = `https://restcountries.com/v3.1/name/${inputData}?fields=name,capital,population,flags,languages`;
    
    fetch(url)
        .then(response => response.json())
        .then(country => renderCountryList(country));
    
    ;
   
}

 function renderCountryList(country) {
        const markup = country.map(({ name, flags }) => { return `<li><img src="${flags.svg}"  alt="${flags.alt}" width="25" /><span>${name.official}</span></li> ` });
        countryList.innerHTML = markup;
    }



// debounce(, DEBOUNCE_DELAY),  {
//       leading: false,
//       trailing: true,
//     }

// function renderCountrisName(arrayCountriesName) {
//     const markup = arrayCountriesName.map(({name, flags}) => {
//         return `<li><img src="${flags.svg}" alt="${flags.alt}" width="25" height="15"><span>${name.common}</span></li>`;
//     }).join("");
//     countriesList.innerHTML = markup;
// }