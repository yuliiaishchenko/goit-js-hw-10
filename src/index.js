import './css/styles.css';
import { fetchCounties } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Netflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(onSearchCountry,DEBOUNCE_DELAY));

function onSearchCountry(evt){
    evt.preventDefault();

    const searchCountry = searchBox.value.trim();

    if (!searchCountry){
        resetMarkup(countryList);
        resetMarkup(countryInfo);
        return;
    }


fetchCounties(searchCountry).then(result => {
    if (result.length > 10){
Netflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    else if (result.length >= 2 && result.length <= 10){
        resetMarkup(countryList)
        createMarkupCountryList(data)
        resetMarkup(countryInfo)
    }
    else{
        resetMarkup(countryInfo);
        createMarkupCountryInfo(data);
        resetMarkup(countryList);
    }
}).catch( error => {
    Netflix.Notify.failure('Oops, there is no country with that name');

})}
function createMarkupCountryList(data){
    const markup =data.map(el => {
        return`
        <li class = "country_item">
        <img scr = "${el.flags.svg}" alt ="${el.name.official}"/>
        <p>${el.name.official}</p>
        </li>`
    })
}

function createMarkupCountryInfo(data){
    const markup = data.map(({name, capital, population, flags, languages}) => {
        return `
        <div class="country_flag>
        <img class = "country_img" src = "${flags.svg}" alt = "flag">
        <p class = "country_name">${name.official}</p>
        </div>
        <ul class = "country_info">
        <li class = "country_item"><p>Capital</p>:
        <span class = "country_span">${capital}</span>
        </li>        
        <li class = "country_item"><p>Population</p>:
        <span class = "country_span">${population}</span>
        </li> 
        <li class = "country_item"><p>Languages</p>:
        <span class = "country_span">${languages}</span>
        </li> 
        </ul>
        `
    }).join('');

    return countryInfo.insertAdjacentHTML('beforeend', markup)
}

function resetMarkup(el){
    el.innerHTML = ''
}