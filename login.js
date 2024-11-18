let signinBtn = document.getElementById('signin');
let title = document.getElementById('title');
let email = document.getElementById('email');
let password = document.getElementById('password');
let inputs = document.querySelectorAll('input');
let form = document.getElementById('registerForm');
let errorMessage = document.getElementById('errorMessage');
let errorMessagePass = document.getElementById('errorMessagePass');
let errorMsg = document.getElementById('small');
const formData = {};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    formData.email = form.elements.email.value;
    formData.password = form.elements.password.value;
    if (email.value == 0) {
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'red';
        errorMessage.innerHTML = 'This cannot be empty!';
        errorMsg.style.display = 'none';
    }else {
        errorMessage.style.display = 'none';
        errorMsg.style.display = 'none';
    }
    if (password.value == 0) {
        errorMessagePass.style.display = 'block';
        errorMessagePass.style.color = 'red';
        errorMessagePass.innerHTML = 'This cannot be empty!';
        errorMsg.style.display = 'none';
    }else if(password.value < 8) {
        errorMessagePass.style.display = 'block';
        errorMessagePass.style.color = 'red';
        errorMessagePass.innerHTML = 'This cannot be less than 8 characters!';
        errorMsg.style.display = 'none';
    }

    let enterEmail = email.value;
    let enterPass  = password.value;

    let getEmail = localStorage.getItem('email');
    let getPass = localStorage.getItem('password');
    
    if(enterEmail == getEmail){
        if(enterPass === getPass){
            errorMessagePass.style.display = 'none';
            errorMessage.style.display = 'none';
            errorMsg.style.display = 'none';
            signinBtn.setAttribute( 'onclick' , "window.location.href='index.html';");
        }else{
            console.log('wrong pass');
            errorMessagePass.style.display = 'block';
            errorMessagePass.style.color = 'red';
            errorMessagePass.innerHTML = 'Wrong Password!';
            errorMsg.style.display = 'none';
        }
    }else {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = "Create an account if you don't have one!";
    }

    console.log(formData);
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