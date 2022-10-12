const iconToggle = document.getElementById('dark-mode-icon');
const darkModeToggle = document.getElementById('dark-mode-button');

//Theme Vars
const bgColor = '--bg-color';
const txtColor = '--text-color';
const elementColor = '--elements-color';
const boxShadow = '--box-shadow';
let darkMode = true;


const refresh =  () =>  {
    setTimeout(() => {
        window.location.reload();
    }, 50);
}

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
    refresh();
})


//On Document Load

document.addEventListener('DOMContentLoaded', () => {
    const isDark = localStorage.getItem('isDark');
    (isDark === 'yes') ?    switchToDarkMode() : switchToLightMode();

    const url = window.location.href.toString();
    if (url.includes('homeDesign.html')) {
        displayCards()
        homeEvents()
    }
    else{
        detailEvents()
    }
})

const homeEvents = () => {

    //searchINPUT
    const searchText = document.getElementById("search");
    searchText.addEventListener('keyup' , event => {
        if(event.key === 'Enter'){
            const value = event.target.value.toLowerCase();
            searchCountry(value);
            event.target.value = '';
        }
    })


    const dropdownBtn = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.rounded');

    dropdownBtn.addEventListener('click', e => {
        dropdownMenu.classList.toggle('show');
        e.preventDefault();
    })


    const regionsList =document.querySelectorAll('.items');
    regionsList.forEach( region => {
        region.addEventListener('click', event => {
            const value = event.target.innerHTML.toLowerCase();
            regionFilter(value);
            dropdownMenu.classList.remove('show');
            event.preventDefault();
        })

    });


    const nextPage = () => {
            window.location.href = './detailDesign.html';
    }

    const save = document.querySelector('.row');
    save.addEventListener('click', nextPage);

}

const detailEvents = () => {
    const backBtn = document.querySelector('.back');
    backBtn.addEventListener('click', () => {
        window.location.href = './homeDesign.html';
    })

}


const countriesCards = dataCards => {
    const cards = document.querySelector('.row');

    let card = '';
    dataCards.forEach(country => { card += `
<div class="col  col-lg-3  col-md-4 col-sm-6 ">
            <div class="card border-light pb-3">
             <a data-name="${country.name.common}" class="country-link">
             <img class="card-img-top" src="${country.flags.svg}" alt="${country.name.common}">
           </a>
                <div class="card-body p-4">
                  <a data-name="${country.name.common}" class="country-link">
                    <div class="state">${country.name.common}</div>
                     </a>
                    <p class="card-text content mt-3">
                        Population:&nbsp<span class="fw-normal">${country.population.toLocaleString('en')}</span><br>
                        Region:&nbsp<span class="fw-normal">${country.region}</span><br>
                        Capital:&nbsp<span class="fw-normal">${country.capital}</span><br>
                    </p>
                </div>
            </div>
        </div>
         `;
    });

    cards.innerHTML = card;
}



const countrysDetails = () => {
    const details_pageElement = document.querySelector('.detailsPage');

    details_pageElement.innerHTML = ` 
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
           Top Level Domain:&nbsp<span>${data.tld}</span><br>
          Currencies:&nbsp<span>${currency}</span><br>
          Languages:&nbsp<span>${language}</span>

         </p>
        </div>
      </div>
    }
    `;

}

////////////////////////////////////////////////////////////////////////////////////functions
const displayCards = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(dataCards => countriesCards(dataCards))
        .catch(error => console.error('Error:', error));
}


const searchCountry =function (name)  {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(res => res.json())
        .then(dataCards => countriesCards(dataCards))
}


const  regionFilter = (region) => {

    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(dataCards => countriesCards(dataCards))
}



