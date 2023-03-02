
import  debounce  from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputEl.addEventListener('input',debounce(onSearch, DEBOUNCE_DELAY) );

function onSearch(event) {
    event.preventDefault();

    const inputData = inputEl.value;
    console.log(inputData);

    const url = `https://restcountries.com/v3.1/name/${inputData}?fields=name,capital,population,flags,languages`;
    
    fetch(url)
        .then(response => response.json())
        .then(country => renderCountryList(country))
        // .then(country=> renderCountryInfo(country))
    
    ;
   
}

 function renderCountryList(country) { 
     const markup = country.map(({ name, flags, capital, population, languages }) =>
     { return `<li><h2><img src="${flags.svg}"  alt="${flags.alt}" width="25" />  ${name.official}</h2></li><p><b>Capital:  </b>${capital}</p><p><b>Population: </b>${population}</p><p><b>Languages:  </b>${Object.values(languages).join(", ")}</p> ` });
        countryList.innerHTML = markup;
    }
// function renderCountryInfo(country) {
//     const markup = `<p>Capital: ${capital}</p><p>Population: ${population}</p><p>Languages: ${languages}</p>`;
//     countryInfo.innerHTML = markup;
// }


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