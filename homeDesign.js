
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

darkModeToggle.addEventListener('click', e => {
    darkMode ? switchToLightMode() :  switchToDarkMode();
})

document.addEventListener('DOMContentLoaded', () => {
    const isDark = localStorage.getItem('isDark');
    (isDark === 'yes') ?    switchToDarkMode() : switchToLightMode();
})


var arrayGlobal=[];


init();

 function init(){
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(dataCards => renderCards(dataCards))
        .catch(error => console.error('Error:', error));
}

const renderCards = dataCards => {
    const cardsContent = document.querySelector('.cards');

    arrayGlobal=dataCards;

    let card = '';
    dataCards.forEach(country => { card += `
<div class="col  col-lg-4 col-md-6 col-sm-12 ">
            <div class="card  pb-lg-3 pb-sm-1 draggable" draggable="true">
             <a data-name="${country.name.common}" class="country-link">
             <img class="card-img-top" src="${country.flags.svg}" alt="${country.name.common}" draggable="false">
           </a>
                <div class="card-body p-4 pb-0 mb-0">
                  <a data-name="${country.name.common}" class="country-link">
                    <div class="state">${country.name.common}</div>
                     </a>
                    <p class="card-text content mt-3 mb-0">
                        Population:&nbsp<span class="fw-normal">${country.population.toLocaleString('en')}</span><br>
                        Region:&nbsp<span class="fw-normal">${country.region}</span><br>
                        Capital:&nbsp<span class="fw-normal">${country.capital}</span><br>
                    </p>
                </div>
                <button type="button" class="btn btn-link "><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-star-fill d-lg-none starBtn" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg></button>
            </div>
        </div>
         `;
    });

    cardsContent.innerHTML = card;
}


const renderRegionCards = dataCards => {
    const cardsContent = document.querySelector('.cards');

    let card = '';
    dataCards.forEach(country => { card += `
<div class="col  col-lg-4 col-md-6 col-sm-12 ">
            <div class="card  pb-lg-3 pb-sm-1 draggable" draggable="true">
             <a data-name="${country.name.common}" class="country-link">
             <img class="card-img-top" src="${country.flags.svg}" alt="${country.name.common}" draggable="false">
           </a>
                <div class="card-body p-4 pb-0 mb-0">
                  <a data-name="${country.name.common}" class="country-link">
                    <div class="state">${country.name.common}</div>
                     </a>
                    <p class="card-text content mt-3 mb-0">
                        Population:&nbsp<span class="fw-normal">${country.population.toLocaleString('en')}</span><br>
                        Region:&nbsp<span class="fw-normal">${country.region}</span><br>
                        Capital:&nbsp<span class="fw-normal">${country.capital}</span><br>
                    </p>
                </div>
                <button type="button" class="btn btn-link "><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-star-fill d-lg-none starBtn" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg></button>
            </div>
        </div>
         `;
    });

    cardsContent.innerHTML = card;
}

document.addEventListener('DOMContentLoaded', () => {

    document.body.addEventListener('dragstart', handleDragStart); //for draggable
    document.body.addEventListener('drop', handleDrop); //for dropzone
    document.body.addEventListener('dragover', handleOver); //for dropzone
    document.body.addEventListener('click', closeButton);
    document.body.addEventListener('click', starClick);
    document.body.addEventListener('click', renderCountry);
    document.body.addEventListener('click', filterByRegion);
});

var searchedCountry='';
var filteredCountry='';

 const dropdownBtn = document.querySelector('.dropdown-toggle');
 const dropdownMenu = document.querySelector('.rounded');

 dropdownBtn.addEventListener('click', e => {
     dropdownMenu.classList.toggle('show');
 })


function filterByRegion(ev){
     if(ev.target.classList.contains('items')){

         const regionItem=ev.target.innerHTML.toLowerCase();
         const cardsContent = document.querySelector('.cards');
         if(regionItem.toLowerCase()==='no filter'){
             renderRegionCards(arrayGlobal);
         }
                 else  if(regionItem.toLowerCase()==='favourites') {
                    cardsContent.innerHTML ="";
                     for(const item of document.querySelectorAll('.countyName')){
                         const content =item.innerHTML.toLowerCase().substring(12);
                         fetch(`https://restcountries.com/v3.1/name/${content}`)
                             .then(res => res.json())
                             .then(dataCards => renderFav(dataCards))
                             .catch(error => console.error('Error:', error));
                     }
                 }
                 else {
             filterRegion(regionItem);
             filteredCountry=regionItem;
         }
                 // regionFilter(value);
                 dropdownMenu.classList.remove('show');
                 // localStorage.setItem('filterCountry', value);
     }
}

const renderFav = dataCards => {
    const cardsContent = document.querySelector('.cards');
    let card = '';
    dataCards.forEach(country => { card += `
<div class="col  col-lg-4 col-md-6 col-sm-12 ">
            <div class="card  pb-lg-3 pb-sm-1 draggable" draggable="true">
             <a data-name="${country.name.common}" class="country-link">
             <img class="card-img-top" src="${country.flags.svg}" alt="${country.name.common}" draggable="false">
           </a>
                <div class="card-body p-4 pb-0 mb-0">
                  <a data-name="${country.name.common}" class="country-link">
                    <div class="state">${country.name.common}</div>
                     </a>
                    <p class="card-text content mt-3 mb-0">
                        Population:&nbsp<span class="fw-normal">${country.population.toLocaleString('en')}</span><br>
                        Region:&nbsp<span class="fw-normal">${country.region}</span><br>
                        Capital:&nbsp<span class="fw-normal">${country.capital}</span><br>
                    </p>
                </div>
                <button type="button" class="btn btn-link "><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-star-fill d-lg-none starBtn" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg></button>
            </div>
        </div>
         `;
    });

    cardsContent.innerHTML += card;
}

 const filterRegion =function (value)  {

     renderRegionCards(arrayGlobal.filter((country) => (country.region.toLowerCase()===value.toLowerCase())));
     console.log(arrayGlobal);
 }


const searchText = document.getElementById("search");
searchText.addEventListener('keyup' , event => {
    const value = event.target.value.toLowerCase();
    searchedCountry=value;
    searchCountry(value);
})

 const searchCountry =function (value)  {
              arrayGlobal=[];
         fetch(`https://restcountries.com/v3.1/name/${value}`)
             .then(res => res.json())
             .then(dataCards => arrayGlobal=dataCards)
             .then(dataCards => renderSearchCards(dataCards,value));
 }

function renderSearchCards(dataCards,value){

    if(filteredCountry==='') {
        renderRegionCards(arrayGlobal);
    }
    else if(value===''){
        init();
    }
    else {
        renderRegionCards(arrayGlobal.filter((country) => (country.region.toLowerCase()===filteredCountry.toLowerCase())));
    }

}













function handleDragStart(ev) {
    let obj = ev.target;
    if (!obj.closest('.draggable')) return;
    if(obj.classList.contains('draggable')){
        obj = obj.firstElementChild;
    }

        const link = obj.firstElementChild;
        let countryIMG = link.getAttribute('src').toLowerCase();
         let countryName = link.getAttribute('alt').toLowerCase();
        ev.dataTransfer.setData('text/plain',countryIMG+"-"+countryName );

    const colorStar=ev.target.lastElementChild.firstElementChild;
    colorStar.style.color = 'rgb(237, 95, 30)';
}

function handleDrop(ev) {
    let dropzone = ev.target;
    if (!dropzone.classList.contains('dropzone')) return;
    ev.preventDefault();
    // console.log('handleDraging',ev.dataTransfer);

    dropzone.classList.remove('over');
    let data = ev.dataTransfer.getData('text/plain');
    let array=data.split("-");
    let flag=false;

    for(const item of document.querySelectorAll('.countyName')){
        const content =item.textContent;
        if(content.trim()===array[1].trim()){
            flag=true;
        }
    }


    if(flag===false){
        let node = document.createElement('li');
        node.innerHTML=` <div class="d-flex justify-content-start"><img  src="${array[0]}" /><div class="countyName">&nbsp&nbsp${array[1]}</div></div>
                    <button type="button" class="btn-close btn-circle closeBtn" aria-label="Close"></button>`;

        document.querySelector('.fav').appendChild(node);
    }
}


function handleOver(ev) {
    let dropzone = ev.target;
    if (!dropzone.classList.contains('dropzone')) return;
    ev.preventDefault();
    dropzone.classList.add('over');
}

function closeButton(ev) {
    let closeBtn = ev.target;
    if (closeBtn.classList.contains('closeBtn')){
        closeBtn.parentElement.remove();

    let countryName =closeBtn.parentElement.firstElementChild.lastElementChild.textContent;

    for(const item of document.querySelectorAll('.card')){
        const content =item.firstElementChild.getAttribute('data-name').toLowerCase();
        if(content.trim()===countryName.trim()){
            item.lastElementChild.firstElementChild.style.color = 'lightgray';
        }
    }
    }
}

function starClick(ev) {
    let closeBtn = ev.target;
    if (closeBtn.classList.contains('starBtn')){

        const link = closeBtn.parentElement.parentElement.firstElementChild.firstElementChild;

        if(closeBtn.style.color === 'rgb(237, 95, 30)'){
            closeBtn.style.color = 'lightgray';

            let countryName= link.getAttribute('alt').toLowerCase();


            for(const item of document.querySelectorAll('.countyName')){
                const content =item.textContent;
                if(content.trim()===countryName.trim()){
                    item.parentElement.parentElement.remove();
                }
            }
        }//if
        else{
        closeBtn.style.color = 'rgb(237, 95, 30)';

    // alert(closeBtn);
    let countryIMG = link.getAttribute('src').toLowerCase();
    let countryName = link.getAttribute('alt').toLowerCase();

    let node = document.createElement('li');
    node.innerHTML=` <div class="d-flex justify-content-start"><img  src="${countryIMG}" /><div class="countyName">&nbsp&nbsp${countryName}</div></div>
                    <button type="button" class="btn-close btn-circle closeBtn " aria-label="Close"></button>`;

    document.querySelector('.fav').appendChild(node);
}//else
    }
}


function renderCountry (e) {
    if(e.target.parentElement.classList.contains('country-link'))
    {
        const link = e.target.parentElement;
        let countryName = link.getAttribute('data-name').toLowerCase();

        localStorage.removeItem('country-name');
        localStorage.setItem("country-name", countryName);

        window.open("https://reemamuhesin.github.io/assignments/detailDesign.html");
    }
}

