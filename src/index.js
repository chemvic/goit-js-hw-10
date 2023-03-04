
import  debounce  from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './css/styles.css';
import fetchCountries from "../src/fetchCountries"
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputEl.addEventListener('input',debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();

    const inputData = inputEl.value.trim();
    if (inputData === "") { return; };
    
    fetchCountries(inputData)
        .then(renderCountryList)
        .catch(onFetchError)
        
}



function onFetchError() {
    Notify.failure("Oops, there is no country with that name");
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
};


function renderCountryList(country) { 

    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    
     if (country.length>1&&country.length<=10) {

         drawCountryList(country)
         
    } else if (country.length === 1) {
        drawOneCountryList(country);
        drawCountryInfo(country);
   
    } else if (country.length > 10 ) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
    
}
    

function drawCountryInfo(country) {
     const markup = country.map(({ capital, population, languages}) =>
     {
         return `<p><b>Capital:  </b>${capital}</p><p><b>Population: </b>${population}</p><p><b>Languages:  </b>${Object.values(languages).join(", ")}</p> `
     }).join("");;
    countryInfo.innerHTML = markup;
}

function drawCountryList(country){ const markup = country.map(({ name, flags}) =>
     { return `<li><img src="${flags.svg}"  alt="${flags.alt}" width="25" />  ${name.official}</li>` }).join("");
    countryList.innerHTML = markup;
}
        
function drawOneCountryList(country){const markup = country.map(({ name, flags}) =>
     { return `<li><h2><img src="${flags.svg}"  alt="${flags.alt}" width="25" />  ${name.official}</h2></li>` }).join("");
    countryList.innerHTML = markup;
}
        
    //      const markup = country.map(({ name, flags}) =>
    //  { return `<li><p><img src="${flags.svg}"  alt="${flags.alt}" width="25" />  ${name.official}</p></li>` }).join("");
    //     countryList.innerHTML = markup;

 //      const markup = country.map(({ name, flags, capital, population, languages }) =>
    //  { return `<li><h2><img src="${flags.svg}"  alt="${flags.alt}" width="25" />  ${name.official}</h2></li><p><b>Capital:  </b>${capital}</p><p><b>Population: </b>${population}</p><p><b>Languages:  </b>${Object.values(languages).join(", ")}</p> ` }).join("");
    //     countryList.innerHTML = markup;