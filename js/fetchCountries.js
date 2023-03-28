const BASE_URL = 'https://restcountries.com/v3.1/name/{name}';

export function fetchCounties (name) {
fetch(`${BASE_URL}/{name}?fields=name.official,capital,population,flags.svg,languages`).then(

    response => {
        if (!response.ok)
    {throw new Error(response.status);}
    
    return res.json();}
);}