const iconToggle = document.getElementById('dark-mode-icon');
const darkModeToggle = document.getElementById('dark-mode-button');


const bgColor = '--bg-color';
const txtColor = '--text-color';
const elementColor = '--elements-color';
const boxShadow = '--box-shadow';
let darkMode = true;


const switchToLightMode  = () => {
    document.documentElement.style.setProperty(bgColor, 'hsl(0, 0%, 98%)');
    document.documentElement.style.setProperty(txtColor, 'hsl(200, 15%, 8%)');
    document.documentElement.style.setProperty(elementColor, 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty(boxShadow,'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;');
    iconToggle.classList.remove('fas');
    iconToggle.classList.add('far');
    localStorage.setItem('isDark', 'no');
    darkMode = false;

};

const switchToDarkMode  = () => {
    document.documentElement.style.setProperty(bgColor, 'hsl(207, 26%, 17%)');
    document.documentElement.style.setProperty(txtColor, 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty(elementColor, 'hsl(209, 23%, 22%)');
    document.documentElement.style.setProperty(boxShadow,'none');
    iconToggle.classList.remove('far');
    iconToggle.classList.add('fas');
    localStorage.setItem('isDark', 'yes');
    darkMode = true;

};

//On darkMode icon Click
darkModeToggle.addEventListener('click', e => {
    darkMode ? switchToLightMode() :  switchToDarkMode();
})

document.addEventListener('DOMContentLoaded', () => {
    const isDark = localStorage.getItem('isDark');
    (isDark === 'yes') ?    switchToDarkMode() : switchToLightMode();
})

const name = localStorage.getItem('country-name');

fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => res.json())
    .then(dataCards => displayCountry(dataCards))
    .catch(error => console.error('Error:', error));



const displayCountry = country => {
    const countryElement = document.querySelector('.detailsPage');
    const data = country[0];

    const nativeNames = data.name.nativeName;
    const nativeName = Object.values(nativeNames)[0].common;

    const currencies = data.currencies;
    let currencyArr = []
    for( const key in currencies){
        currencyArr.push(currencies[key].name)
    }
    const currency = currencyArr.join(', ');

    const languages = data.languages;
    let languagesArr = []
    for( const key in languages){
        languagesArr.push(languages[key])
    }
    const language = languagesArr.join(', ');

    const threeBorders = data.borders.slice(0,3);


    countryElement.innerHTML = ` 
     <div class="col-sm-6 col-12 ">
      <img class=" w-100 pe-sm-4 pe-0" src="${data.flags.svg}" alt="${data.name.common}" >
    </div>

    <div class="col-sm-6 col-12 description ">
      <div class="row align-items-center">
        <div class="col-12 col-sm-6  mt-4 mt-sm-0 ps-sm-4 ps-0">
          <div>
          <h5 class="fw-bolder pb-3">${data.name.common}</h5>
          <p class="smallDisc">
            Native Name:&nbsp<span>${nativeName}</span><br>
            Population:&nbsp<span>${data.population.toLocaleString('en')}</span><br>
            Region:&nbsp<span>${data.region}</span><br>
            Sub Region:&nbsp<span>${data.subregion}</span><br>
            Capital:&nbsp<span>${data.capital}</span>
          </p>
        </div>
        </div>

        <div class="col-12 col-sm-6  mt-3 mt-sm-0 ps-sm-2 ps-0">
         <p class="smallDisc">
           Top Level Domain:&nbsp<span>be</span><br>
          Currencies:&nbsp<span>Euro</span><br>
          Languages:&nbsp<span>Dutch, French, German</span>

         </p>
        </div>
      </div>

      <div class="row mt-4 ">
        <div class="ps-sm-4 ps-0 d-flex align-items-sm-center flex-column flex-sm-row  ">
          <div class="mb-2 mb-sm-0 me-0 me-sm-2 borderCountries">Border Countries:</div>
          <div class="d-flex align-items-center flex-row">
          <div class=" m-1 text-center shadow-sm shadow-intensity-lg"><button type="button" class="btn"> France</button></div>
          <div class=" m-1 text-center shadow-sm shadow-intensity-lg"><button type="button" class="btn "> Germany</button></div>
          <div class="m-1 text-center shadow-sm shadow-intensity-lg"><button type="button" class="btn"> Netherlands</button></div>
        </div>
        </div>
      </div>

    </div>
`;
}


document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', goBack);
});


function goBack (ev){
    if(ev.target.classList.contains('back'))
        window.open("http://localhost:63342/bsProj/homeDesign.html");
}


