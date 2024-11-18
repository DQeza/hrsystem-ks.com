let container = document.getElementById('container');
let navBar = document.getElementById('nav-bar');
let menu = document.getElementById('menu');
let menuIcon = document.getElementById('menuIcon');
let removeMenu = document.getElementById('x');
let yourName = document.getElementById('yourName');
let firstName = localStorage.getItem('name');
let lastName = localStorage.getItem('surname');
let form = document.getElementById('form');
let leave = document.getElementById('leave');
let startDateId = document.getElementById('startDate');
let daysId = document.getElementById('days');
let endDateId = document.getElementById('endDate');
let submit = document.getElementById('submit');
let table = document.getElementById('tablee');
let errorMessage = document.querySelectorAll('small');
let addLeave = document.getElementById('addLeave');
let deleteBtn = document.getElementById("two");
let isEditMode = false;
let leaves = [];
const formData = {};
yourName.innerHTML = `${firstName} ${lastName}`;

function displayItems() {
    let itemsFromStorage = getFromStorage();
    itemsFromStorage.forEach(item => {
        createLeave(item);
    });
}

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

function renderLeave() {
    table.innerHTML = '';
    let tableContent = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    let headerRow = document.createElement('tr');

    headerRow.innerHTML = `
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>Days</th>
                <th>End Date</th>
                <th>Actions</th>
                `;
    leaves.forEach(formdata => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${formdata.$leave}</td>
        <td>${formdata.$startDate}</td>
        <td>${formdata.$days}</td>
        <td>${formdata.$endDate}</td>
        <td><button class="active1" id="one"><i class="fa-solid fa-edit"></i></button>
        <button class="active" id="two"><i class="fa-solid fa-trash-can id="delete"></i></button></td>
        `;
        tableBody.appendChild(row);
    });
    tableHead.appendChild(headerRow);
    tableContent.appendChild(tableHead);
    tableContent.appendChild(tableBody);
    table.appendChild(tableContent);
};

function createLeave(item) {
    if (!item) {
        form.style.display = 'none';
        addLeave.style.display = 'block';
        submit.innerHTML = 'Submit';
        submit.style.backgroundColor = 'black';
        submit.style.border = 'none';
        const $leave = leave.value;
        const $startDate = startDateId.value;
        const $days = daysId.value;
        const $endDate = endDateId.value;
        let formDataObj = {
            id: leaves.length + 1,
            $leave,
            $startDate,
            $days,
            $endDate
        }

        leaves.push(formDataObj);
        addItemToStorage(formDataObj);
        leave.value = '';
        startDateId.value = '';
        daysId.value = '';
        endDateId.value = '';
    } else {
        leaves.push(item);
    }

    renderLeave();
}


function addItemToStorage(item) {
    let itemsToStorage;
    if (localStorage.getItem('leaveItems') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('leaveItems'));
    }

    itemsToStorage.push(item);
    localStorage.setItem('leaveItems', JSON.stringify(itemsToStorage));
}

function getFromStorage() {
    let itemsToStorage;
    if (localStorage.getItem('leaveItems') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('leaveItems'));
    }

    return itemsToStorage;
}

addLeave.addEventListener('click', function () {
    form.style.display = 'block';
    addLeave.style.display = 'none';
});

form.addEventListener('submit', function (e) {
    console.log('test');
    e.preventDefault();
    if (isEditMode) {
        formData.leave = leave.value;
        formData.startDateId = startDateId.value;
        formData.daysId = daysId.value;
        formData.endDateId = endDateId.value;
        console.log(formData);
        addItemToStorage(formData);
    }else {
        createLeave();
    }

});

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('active')) {
        clearItem(e.target.parentElement.parentElement.parentElement);
    }
    if (e.target.parentElement.classList.contains('active1')) {
        setEditMode(e.target);
    }
}

function clearItem(item) {
    if (confirm('Are you sure to delete?')) {
        item.remove();
        removeFromStorage(item.textContent);
    }
}

function removeFromStorage(item) {
    let itemFromStorage = getFromStorage();
    itemFromStorage = itemFromStorage.filter((i) => i != item);
    localStorage.setItem('leaveItems', JSON.stringify(itemFromStorage));
}

function setEditMode(item) {
    isEditMode = true;
    table.querySelectorAll('td').forEach(i => {
        i.classList.remove('edit-mode');
    });
    item.classList.add('edit-mode');
    submit.innerHTML = '<i class="fa-solid fa-pen"></i> Update';
    submit.style.backgroundColor = 'green';
    submit.style.border = 'none';
    let index = 1;
    leave.value = item.parentElement.parentElement.parentElement.childNodes[index].textContent;
    index = 3;
    startDateId.value = item.parentElement.parentElement.parentElement.childNodes[index].textContent;
    index = 5;
    daysId.value = item.parentElement.parentElement.parentElement.childNodes[index].textContent;
    index = 7;
    endDateId.value = item.parentElement.parentElement.parentElement.childNodes[index].textContent;
    form.style.display = 'block';
    addLeave.style.display = 'none';
    submit.addEventListener('click', function () {
        createLeave();
    });
}

table.addEventListener('click', onClickItem);
document.addEventListener('DOMContentLoaded', function() {
    let itemsFromStorage = getFromStorage();
    itemsFromStorage.forEach(item => {
        createLeave(item);
    });
    renderLeave();
});