let container = document.getElementById('container');
let navBar = document.getElementById('nav-bar');
let menu = document.getElementById('menu');
let menuIcon = document.getElementById('menuIcon');
let removeMenu = document.getElementById('x');
let yourName = document.getElementById('yourName');
let file = document.getElementById('file');
let profilePic = document.getElementById('profilePic');
let uploadBtn = document.getElementById('uploadBtn');
let name = document.getElementById('name');
let surname = document.getElementById('surname');
let email = document.getElementById('email');
let gender = document.getElementById('gender');
let firstName = localStorage.getItem('name');
let lastName = localStorage.getItem('surname');
let email1 = localStorage.getItem('email');
let yourGender = localStorage.getItem('gender');
name.setAttribute('value', firstName);
surname.setAttribute('value', lastName);
email.setAttribute('value', email1);
gender.setAttribute('value', yourGender);
yourName.innerHTML = `${firstName} ${lastName}`;

// file.addEventListener('change', function () {
//     const choosedFile = this.files[0];
//     console.log(choosedFile)
//     if (choosedFile) {
//         const reader = new FileReader();
//         reader.addEventListener('load', function () {
//             profilePic.setAttribute('src', reader.result);
//         });
//         reader.readAsDataURL(choosedFile);
//         var imgAsDataURL = reader.toDataURL("data:image/jpg;base64");
//         // console.log(reader);
//         localStorage.setItem('img', imgAsDataURL);
//     }

// });
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// Function to upload and store the image
async function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const profilePic = document.getElementById('profilePic');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const base64Image = await toBase64(file);

        // Store the Base64 image string in local storage
        localStorage.setItem('profilePic', base64Image);

        // Set the image src to the Base64 string
        profilePic.src = base64Image;
    }
}

// Load the stored image when the page is loaded
window.onload = () => {
    const storedImage = localStorage.getItem('profilePic');
    if (storedImage) {
        document.getElementById('profilePic').src = storedImage;
    }
};

menuIcon.addEventListener('click', function (e) {
    e.preventDefault();
    container.style.marginLeft = '20%';
    container.style.width = '80%';
    menu.style.display = 'block';
    menu.style.width = '20%';
});

removeMenu.addEventListener('click', function (e) {
    e.preventDefault();
    container.style.marginLeft = '0%';
    container.style.width = '100%';
    menu.style.display = 'none';
    menu.style.width = '0%';
});