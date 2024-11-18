let registerBtn = document.getElementById('register');
let title = document.getElementById('title');
let nameField = document.getElementById('nameField');
let name = document.getElementById('name');
let surname = document.getElementById('surname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let gender = document.getElementById('gender');
let genderField = document.getElementById('genderField');
let inputs = document.querySelectorAll('input');
let form = document.getElementById('registerForm');
let errorMessage = document.getElementById('errorMessage');
let errorMessageEmail = document.getElementById('errorMessageEmail');
let errorMessagePass = document.getElementById('errorMessagePass');
let errorSelect = document.getElementById('errorSelect');
const formData = {};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    formData.name = form.elements.name.value;
    formData.email = form.elements.email.value;
    formData.password = form.elements.password.value;
    formData.gender = gender.options[gender.selectedIndex].text;
    if (name.value == 0) {
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'red';
        errorMessage.innerHTML = 'This cannot be empty!';
        registerBtn.setAttribute( 'onclick' , "#");
    }else{
        errorMessage.style.display = 'none';
        registerBtn.setAttribute( 'onclick' , "window.location.href='index.html';");
    }
    if (surname.value == 0) {
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'red';
        errorMessage.innerHTML = 'This cannot be empty!';
        registerBtn.setAttribute( 'onclick' , "#");
    }else{
        errorMessage.style.display = 'none';
        registerBtn.setAttribute( 'onclick' , "window.location.href='index.html';");
    }
    if(email.value == 0) {
        errorMessageEmail.style.display = 'block';
        errorMessageEmail.style.color = 'red';
        errorMessageEmail.innerHTML = 'This cannot be empty!';
        registerBtn.setAttribute( 'onclick' , "#");
    }else {
        errorMessageEmail.style.display = 'none';
        registerBtn.setAttribute( 'onclick' , "window.location.href='index.html';");
    }
    if (password.value == 0) {
        errorMessagePass.style.display = 'block';
        errorMessagePass.style.color = 'red';
        errorMessagePass.innerHTML = 'This cannot be empty!';
        registerBtn.setAttribute( 'onclick' , "#");
    }else if (password.value < 8) {
        errorMessagePass.style.display = 'block';
        errorMessagePass.style.color = 'red';
        errorMessagePass.innerHTML = 'This should be more than 8 characters!';
        registerBtn.setAttribute( 'onclick' , "#");
    }else {
        errorMessagePass.style.display = 'none';
        registerBtn.setAttribute( 'onclick' , "window.location.href='index.html';");
    }
    if (gender.value == 0) {
        errorSelect.style.display = 'block';
        errorSelect.style.color = 'red';
        errorSelect.innerHTML = 'You need to choose one!';
        registerBtn.setAttribute( 'onclick' , "#");
    }else {
        errorSelect.style.display = 'none';
        registerBtn.setAttribute( 'onclick' , "window.location.href='index.html';");
    }

    let enterName = name.value;
    let enterSurname = surname.value;
    let enterEmail = email.value;
    let enterPass  = password.value;
    let enterGender = gender.options[gender.selectedIndex].text;

    localStorage.setItem('name' , enterName);
    localStorage.setItem('surname', enterSurname);
    localStorage.setItem('email' , enterEmail);
    localStorage.setItem('password' , enterPass);
    localStorage.setItem('gender' , enterGender);
    addItemToStorage(formData);
});

function addItemToStorage(item) {
    let itemsToStorage;
    if (localStorage.getItem('items') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('items'));
    }

    itemsToStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsToStorage));
}
 
function getFromStorage() {
    let itemsToStorage;
    if (localStorage.getItem('items') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsToStorage;
}