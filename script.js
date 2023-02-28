// fecthing the symbol data (currency   options) from API endpoint

const getCurrenyOptions = async () => {
    const optionUrl = 'https://api.exchangerate.host/symbols';
    const response = await fetch(optionUrl);
    const json = await response.json();


    return json.symbols;
};


// getCurrentOptions().then(console.log);


// fecthing the currency rate (convert endpoint result ) data from API endpoint

const getCurrencyRate = async (fromCurrency, toCurrency) => {
    const currencyConvertUrl = new URL('https://api.exchangerate.host/convert');
    currencyConvertUrl.searchParams.append('from', fromCurrency);
    currencyConvertUrl.searchParams.append('to', toCurrency);
    const response = await fetch(currencyConvertUrl);
    const json = await response.json();


    return json.result;

};
// this function will create new option element and creat it for the select element being pass as an argument
const appendOptionsElToSelectEl = (selectEl, optionItem) => {
    const optionEl = document.createElement('option');
    optionEl.value = optionItem.code;
    optionEl.textContent = optionItem.description;

    selectEl.appendChild(optionEl);

};


const populateSelectEl = (selectEl, optionList) => {
    optionList.forEach(optionItem => {
        appendOptionsElToSelectEl(selectEl, optionItem);
    })

};


// setup currencies and make reference to the DOM elements
const setUpCurrencies = async () => {
    const fromCurrency = document.querySelector('#fromCurrency')
    const toCurrency = document.querySelector('#toCurrency')

    const currencyOptions = await getCurrenyOptions()
    const currencies = Object.keys(currencyOptions).map(currencyKeys => currencyOptions[currencyKeys]);


    // populate the select elements using the previous function 
    populateSelectEl(fromCurrency, currencies);
    populateSelectEl(toCurrency, currencies);
}

// Setting up the event listener for our form element 
const setUpEventListener = () => {
    const formEl = document.getElementById('convertForm')
    formEl.addEventListener('submit', async event => {

        event.preventDefault();

        const fromCurrency = document.querySelector('#fromCurrency')
        const toCurrency = document.querySelector('#toCurrency')
        const amount = document.querySelector('#amount')
        const convertResultEl = document.querySelector('#convertResult')

        try {
            const rate = await getCurrencyRate(fromCurrency.value, toCurrency.value);
            const amountvalue = Number(amount.value)
            const convertionRate = Number(amountvalue * rate).toFixed(2);
            convertResultEl.textContent = `${amountvalue}${fromCurrency.value} =${convertionRate} ${toCurrency.value}`
        }
        catch (err) {
            convertResultEl.textContent = `There is an error fetching data [${err.message}]`
            convertResultEl.classList.add('error');

        }

    })
}

setUpEventListener();
setUpCurrencies();





