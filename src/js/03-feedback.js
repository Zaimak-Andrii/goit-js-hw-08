import throttle from 'lodash.throttle';

const LS_FORM_KEY = 'feedback-form-state';
const UPDATE_DELAY = 500;
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', submitHandler);
refs.email.addEventListener('input', throttle(inputHandler, UPDATE_DELAY));
refs.message.addEventListener('input', throttle(inputHandler, UPDATE_DELAY));

checkLocalStorage();

function inputHandler(evt) {
  updateLocalStorage(evt.target.name, evt.target.value);
}

function submitHandler(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const formData = new FormData(form);

  for (let [name, value] of formData) {
    console.log(`${name} = ${value}`);
  }

  form.reset();
  localStorage.removeItem(LS_FORM_KEY);
}

function updateLocalStorage(key, value) {
  const data = getDataFromLocalStorage();
  if (!data) {
    setDataLocalStorage({ [key]: value });
    return;
  }

  setDataLocalStorage({ ...data, [key]: value });
}

function setDataLocalStorage(data) {
  localStorage.setItem(LS_FORM_KEY, JSON.stringify(data));
}

function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LS_FORM_KEY));
}

function checkLocalStorage() {
  const data = getDataFromLocalStorage();

  if (!data) return;

  const keys = Object.keys(data);

  keys.forEach(key => (refs[key].value = data[key]));
}
