const valueEUR = document.querySelector('[data-eur-value]');
const valueUSD = document.querySelector('[data-usd-value]');
const form = document.querySelector('[data-form]');
const updateBtn = document.querySelector('button');
const fromCurrency = document.querySelector('[data-from]');
const intoCurrency = document.querySelector('[data-into]');
const inputFrom = document.querySelector('[data-input-from]');
const inputInto = document.querySelector('[data-input-into]');

const PRIMARY_CURRENCY = 'UAH';

const updateRate = currency => {
  let curr = eval(`value${currency}`);
  curr.textContent = 99.99;

  fetch(
    `https://api.fastforex.io/fetch-multi?from=${currency}&to=UAH&api_key=7286b54f11-1f02cf7f73-rqv3lj`
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
      curr.textContent = Math.round(currencies.results.UAH * 100) / 100;
    })
    .catch(e => console.log(e));
};
const convertCurrencies = (from, into, input, output) => {
  let result;

  if (from.value === into.value) {
    result = input.value * 1;
  } else if (from.value === PRIMARY_CURRENCY) {
    result = input.value / Number(eval(`value${into.value}.textContent`));
  } else if (into.value === PRIMARY_CURRENCY) {
    result = input.value * Number(eval(`value${from.value}.textContent`));
  } else {
    result =
      (input.value * Number(eval(`value${from.value}.textContent`))) /
      Number(eval(`value${into.value}.textContent`));
  }

  output.value = Math.round(result * 100) / 100;
};
const handleFormChange = event => {
  let currentCurrency = fromCurrency;
  let oppositeCurrency = fromCurrency;
  let currentInput = inputFrom;
  let oppositeInput = inputFrom;

  if (event.target === inputFrom) {
    oppositeInput = inputInto;
    oppositeCurrency = intoCurrency;
  } else {
    currentInput = inputInto;
    currentCurrency = intoCurrency;
  }

  if (event.target === fromCurrency || event.target === intoCurrency) {
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

updateRate('EUR');
updateRate('USD');

form.addEventListener('input', handleFormChange);
updateBtn.addEventListener('click', () => {
  updateRate('EUR');
  updateRate('USD');
});
