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
  const fromCurrency = event.currentTarget.querySelector('[data-from]');
  const intoCurrency = event.currentTarget.querySelector('[data-into]');
  const inputFrom = event.currentTarget.querySelector('[data-input-from]');
  const inputInto = event.currentTarget.querySelector('[data-input-into]');

  let currentCurrency = fromCurrency;
  let oppositeCurrency = fromCurrency;
  let currentInput = inputFrom;
  let oppositeInput = inputFrom;

  let result;

  event.target === inputFrom
    ? (oppositeInput = inputInto)
    : (currentInput = inputInto);

  event.target === inputFrom
    ? (oppositeCurrency = intoCurrency)
    : (currentCurrency = intoCurrency);

  if (currentCurrency.value === oppositeCurrency.value) {
    result = currentInput.value * 1;
  }
  if (currentCurrency.value === 'EUR' && oppositeCurrency.value === 'USD') {
    result =
      (currentInput.value * Number(valueEUR.textContent)) /
      Number(valueUSD.textContent);
  }
  if (currentCurrency.value === 'EUR' && oppositeCurrency.value === 'UAH') {
    result = currentInput.value * Number(valueEUR.textContent);
  }
  if (currentCurrency.value === 'USD' && oppositeCurrency.value === 'EUR') {
    result =
      (currentInput.value * Number(valueUSD.textContent)) /
      Number(valueEUR.textContent);
  }
  if (currentCurrency.value === 'USD' && oppositeCurrency.value === 'UAH') {
    result = currentInput.value * Number(valueUSD.textContent);
  }
  if (currentCurrency.value === 'UAH' && oppositeCurrency.value === 'EUR') {
    result = currentInput.value / Number(valueEUR.textContent);
  }
  if (currentCurrency.value === 'UAH' && oppositeCurrency.value === 'USD') {
    result = currentInput.value / Number(valueUSD.textContent);
  }

  oppositeInput.value = Math.round(result * 100) / 100;
};

updateValueEUR();
updateValueUSD();

formEUR.addEventListener('input', convert);
formUSD.addEventListener('input', convert);
updateBtn.addEventListener('click', () => {
  updateValueEUR();
  updateValueUSD();
});
