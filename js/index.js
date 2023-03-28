import './css/styles.css';
import { fetchCounties } from '../js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(onSearchCountry,DEBOUNCE_DELAY));

function onSearchCountry(evt){
    evt.preventDefault();

    const searchCountry = evt.target.value.trim();

    if (!searchCountry){
        resetMarkup(countryList);
        resetMarkup(countryInfo);
        return;
    }
}

fetchCounties(searchCountry).then(data => {
    if (data.length > 10){
Notify.info('Too many matches found. Please enter a more specific name.');
    };
    else{
        resetMarkup(countryInfo);
        createMarkupCountryInfo(data);
        resetMarkup(countryList);
    }
}).catch(error => {
    Notifly.failure('Oops, there is no country with that name');

})

function createMarkupCountryInfo(data){
    const markup = data.map(({name, capital, population, flags, languages}) => {
        return `
        <div class="country_flag>
        <img class = "country_img" src = "${flags.svg}" alt = "flag">
        <p class = "country_name">${name.official}</p>
        </div>
        <ul class = "country_info">
        <li class = "country_item"><b>Capital</b>:
        <span class = "country_span">${capital}</span>
        </li>        
        <li class = "country_item"><b>Population</b>:
        <span class = "country_span">${population}</span>
        </li> 
        <li class = "country_item"><b>Languages</b>:
        <span class = "country_span">${languages}</span>
        </li> 
        </ul>
        `
    }).join('');

    return countryInfo.insertAdjacentHTML('beforeend', markup)
}