const valueEUR = document.querySelector('[data-eur-value]');
const valueUSD = document.querySelector('[data-usd-value]');
const formEUR = document.querySelector('[data-form-eur]');
const formUSD = document.querySelector('[data-form-usd]');
const updateBtn = document.querySelector('button');

const updateValueEUR = () => {
  valueEUR.textContent = 99.99;
  fetch(
    `https://api.fastforex.io/fetch-multi?from=EUR&to=UAH&api_key=7286b54f11-1f02cf7f73-rqv3lj`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(currencies => {
      return currencies;
    })
    .then(currencies => {
      valueEUR.textContent = Math.round(currencies.results.UAH * 100) / 100;
    })
    .catch(e => console.log(e));
};

const updateValueUSD = () => {
  valueUSD.textContent = 99.99;

  fetch(
    `https://api.fastforex.io/fetch-multi?from=USD&to=UAH&api_key=7286b54f11-1f02cf7f73-rqv3lj`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(currencies => {
      return currencies;
    })
    .then(currencies => {
      valueUSD.textContent = Math.round(currencies.results.UAH * 100) / 100;
    })
    .catch(e => console.log(e));
};
const convert = event => {
  const intoCurrency = event.currentTarget.querySelector('[data-into]');
  const fromCurrency = event.currentTarget.querySelector('[data-from]');
  const resultInput = event.currentTarget.querySelector('[data-result]');

  let currentCurrency = valueEUR;
  let oppositeCurrency = valueEUR;

  let result;

  fromCurrency.name === 'EUR'
    ? (oppositeCurrency = valueUSD)
    : (currentCurrency = valueUSD);

  switch (intoCurrency.value) {
    case fromCurrency.name:
      result = fromCurrency.value * 1;
      break;
    case 'UAH':
      result = fromCurrency.value * currentCurrency.textContent;
      break;
    default:
      result =
        (fromCurrency.value * currentCurrency.textContent) /
        oppositeCurrency.textContent;
  }
  resultInput.value = Math.round(result * 100) / 100;
};

updateValueEUR();
updateValueUSD();

formEUR.addEventListener('input', convert);
formUSD.addEventListener('input', convert);
updateBtn.addEventListener('click', () => {
  updateValueEUR();
  updateValueUSD();
});
