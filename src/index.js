const valueEUR = document.querySelector('[data-eur-value]');
const valueUSD = document.querySelector('[data-usd-value]');
const form = document.querySelector('[data-form]');
const updateBtn = document.querySelector('button');
const fromCurrency = document.querySelector('[data-from]');
const intoCurrency = document.querySelector('[data-into]');
const inputFrom = document.querySelector('[data-input-from]');
const inputInto = document.querySelector('[data-input-into]');

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
const convertCurrencies = (from, into, input, output) => {
  let result;

  if (from.value === into.value) {
    result = input.value * 1;
  }
  if (from.value === 'EUR' && into.value === 'USD') {
    result =
      (input.value * Number(valueEUR.textContent)) /
      Number(valueUSD.textContent);
  }
  if (from.value === 'EUR' && into.value === 'UAH') {
    result = input.value * Number(valueEUR.textContent);
  }
  if (from.value === 'USD' && into.value === 'EUR') {
    result =
      (input.value * Number(valueUSD.textContent)) /
      Number(valueEUR.textContent);
  }
  if (from.value === 'USD' && into.value === 'UAH') {
    result = input.value * Number(valueUSD.textContent);
  }
  if (from.value === 'UAH' && into.value === 'EUR') {
    result = input.value / Number(valueEUR.textContent);
  }
  if (from.value === 'UAH' && into.value === 'USD') {
    result = input.value / Number(valueUSD.textContent);
  }

  output.value = Math.round(result * 100) / 100;
};

const convert = event => {
  let currentCurrency = fromCurrency;
  let oppositeCurrency = fromCurrency;
  let currentInput = inputFrom;
  let oppositeInput = inputFrom;

  event.target === inputFrom
    ? (oppositeInput = inputInto)
    : (currentInput = inputInto);

  event.target === inputFrom
    ? (oppositeCurrency = intoCurrency)
    : (currentCurrency = intoCurrency);

  if (event.target === fromCurrency) {
    oppositeInput = inputInto;
    convertCurrencies(fromCurrency, intoCurrency, inputFrom, oppositeInput);
    return;
  }
  if (event.target === intoCurrency) {
    oppositeInput = inputInto;
    convertCurrencies(fromCurrency, intoCurrency, inputFrom, oppositeInput);
    return;
  }

  convertCurrencies(
    currentCurrency,
    oppositeCurrency,
    currentInput,
    oppositeInput
  );
};

updateValueEUR();
updateValueUSD();

form.addEventListener('input', convert);
updateBtn.addEventListener('click', () => {
  updateValueEUR();
  updateValueUSD();
});
