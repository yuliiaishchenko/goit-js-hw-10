import './css/styles.css';
import { fetchCounties } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Netflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(onSearchCountry,DEBOUNCE_DELAY));

function onSearchCountry(evt){
    evt.preventDefault();

    const searchCountries = evt.target.value.trim();

    if (!searchCountries){
        resetMarkup(countryList);
        resetMarkup(countryInfo);
        return;
    }


    fetchCounties(searchCountries)
.then(result => {
    if (result.length > 10){
Netflix.Notify.info('Too many matches found. Please enter a more specific name.');
return;
    }
    else if (result.length >= 2 && result.length <= 10){
        resetMarkup(countryList);
        createMarkupCountryList(result);
        resetMarkup(countryInfo);
    }
    else{
        resetMarkup(countryInfo);
        createMarkupCountryInfo(result);
        resetMarkup(countryList);
    }
}).catch( error => {
    Netflix.Notify.failure('Oops, there is no country with that name');

})}
function createMarkupCountryList(result){
    const markup =result.map(({ name, flags }) => {
        return`
        <li class = "country-list__item">
        <img class = "country-list__img" scr = "${flags.png}" alt ="flag"/>
        <p class = "country-list__text">${name.official}</p>
        </li>`
    })
    .join('');
    return countryList.insertAdjacentHTML('beforeend', markup);
}

function createMarkupCountryInfo(result){
    const markup = result.map(({ name, capital, population, flags, languages }) => {
        return `
        <div class="country__flag>
        <img class = "country__img" src = "${flags.png}" alt = "flag"></div>
        <p class = "country__name">${name.official}</p>
        
        <ul class = "country-info">
        <li class = "country-info__item"><p>Capital:</p>
        <span class = "country-info__span">${capital}</span>
        </li>        
        <li class = "country-info__item"><p>Population:</p>
        <span class = "country-info__span">${population}</span>
        </li> 
        <li class = "country__item"><p>Languages:</p><span>${Object.values(languages).join(', ')}</span>
        </li> 
        </ul>
        
        `
        
    }).join('');

    return countryInfo.insertAdjacentHTML('beforeend', markup);

     
}

function resetMarkup(el){
    el.innerHTML = '';
}