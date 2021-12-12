import { UI } from './view.js';

const serverUrlGender = 'https://api.genderize.io';
const serverUrlCountry = 'https://api.nationalize.io';
const serverUrlCountryFull = 'https://api.worldbank.org/v2/country/';

UI.form.addEventListener('submit', () => submit(event));

function submit(event) {
	event.preventDefault();

    let firstName;
	firstName = UI.formInput.value.trim();
    firstName = firstName.slice(0, 1).toUpperCase() + firstName.slice(1);

	const urlToGender = `${serverUrlGender}?name=${firstName}`;
	const urlToCountry = `${serverUrlCountry}?name=${firstName}`;

	fetch(urlToGender)
        .then((response) => response.json())
        .then((data) => UI.responseGender.textContent = `${firstName} is ${data.gender}`);
	
    fetch(urlToCountry)
        .then((response) => response.json())
		.then((data) => {
            let countrys = data.country;
            countrys.forEach(item => {
                let probabilityToPercent = (item.probability * 100).toFixed(2) + '%';
                getFullNameCountry(item.country_id, probabilityToPercent);
            });
        });
}

function getFullNameCountry(id, probability){
    const urlToCountryFull = `${serverUrlCountryFull}${id}?format=json`;

    fetch(urlToCountryFull)
        .then(response => response.json())
        .then(data => {
            UI.responseCountry.textContent += `${data[1][0].name} probability: ${probability} `;
        });
}