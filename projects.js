let container = document.getElementById('container');
let navBar = document.getElementById('nav-bar');
let menu = document.getElementById('menu');
let menuIcon = document.getElementById('menuIcon');
let removeMenu = document.getElementById('x');
let yourName = document.getElementById('yourName');
let firstName = localStorage.getItem('name');
let lastName = localStorage.getItem('surname');
let form = document.getElementById('form');
let project = document.getElementById('project');
let assignEmploye = document.getElementById('assignEmploy');
let startDateId = document.getElementById('startDate');
let projectStatus = document.getElementById('status');
let endDateId = document.getElementById('endDate');
let price = document.getElementById('price');
let submit = document.getElementById('submit');
let table = document.getElementById('tablee');
let errorMessage = document.querySelectorAll('small');
let addProject = document.getElementById('addProject');
let deleteBtn = document.getElementById("two");
let isEditMode = false;
let projects = [];
const formData = {};
yourName.innerHTML = `${firstName} ${lastName}`;
let employees = JSON.parse(localStorage.getItem('employeItems'));

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

function createEmploye(){
    for (let i = 0; i < employees.length; i++) {
        let savedPerson = employees[i];
        let checkBoxContainer = document.getElementById('checkbox');
        let input = document.createElement('input');
        input.type= 'checkbox';
        input.name = `employe${i}`;
        input.id = `employe${i}`;
        input.className = 'employe';
        let label = document.createElement('label');
        label.htmlFor = `employe${i}`;
        label.innerHTML = `${savedPerson['$firstName']} ${savedPerson['$lastName']}`;
        input.value = label.innerHTML;
        let br = document.createElement('br');
        checkBoxContainer.appendChild(input);
        checkBoxContainer.appendChild(label);
        checkBoxContainer.appendChild(br);
    };
}
createEmploye();

function renderProject() {
    table.innerHTML = '';
    let tableContent = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    let headerRow = document.createElement('tr');

    headerRow.innerHTML = `
                <th>Project Name</th>
                <th>Status</th>
                <th>Assigned Employees</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th>Actions</th>
                `;
    projects.forEach(formdata => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${formdata.$projectName}</td> 
        <td>${formdata.$status}</td>
        <td>${formdata.$assignEmploye}</td>
        <td>${formdata.$startDate}</td>
        <td>${formdata.$endDate}</td>
        <td><span>${formdata.$price}</span<p>&euro;</p></td>
        <td><button class="active1" id="one"><i class="fa-solid fa-edit"></i></button>
        <button class="active" id="two"><i class="fa-solid fa-trash-can id="delete"></i></button></td>
        `;
        tableBody.appendChild(row);
    });
    tableHead.appendChild(headerRow);
    tableContent.appendChild(tableHead);
    table.appendChild(tableContent);
    tableContent.appendChild(tableBody);
};

function createProject(item) {
    if (!item) {
        form.style.display = 'none';
        addProject.style.display = 'block';
        submit.innerHTML = 'Submit';
        submit.style.backgroundColor = 'black';
        submit.style.border = 'none';
        const $projectName = project.value;
        const $status = projectStatus.options[projectStatus.selectedIndex].text;
        const $assignEmploye = document.querySelector('.employe:checked').value;
        const $startDate = startDateId.value;
        const $endDate = endDateId.value;
        const $price = +price.value;
        let formDataObj = {
            id: projects.length + 1,
            $projectName,
            $status,
            $assignEmploye,
            $startDate,
            $endDate,
            $price
        }

        projects.push(formDataObj);
        addItemToStorage(formDataObj);
        project.value = '';
        startDateId.value = '';
        endDateId.value = '';
        price.value = '';
    } else {
        projects.push(item);
    }

    renderProject();
};

function addItemToStorage(item) {
    let itemsToStorage;
    if (localStorage.getItem('projectsItem') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('projectsItem'));
    }

    itemsToStorage.push(item);
    localStorage.setItem('projectsItem', JSON.stringify(itemsToStorage));
}

function getFromStorage() {
    let itemsToStorage;
    if (localStorage.getItem('projectsItem') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('projectsItem'));
    }

    return itemsToStorage;
}

addProject.addEventListener('click', function () {
    form.style.display = 'block';
    addProject.style.display = 'none';
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isEditMode) {
        formData.project = project.value;
        formData.projectStatus = projectStatus.value;
        //formData.assignEmploye = assignEmploye.value;
        formData.startDateId = startDateId.value;
        formData.endDateId = endDateId.value;
        formData.price = price.value;
        console.log(formData.price)
        console.log(formData);
        addItemToStorage(formData);
    } else {
        createProject();
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
    localStorage.setItem('projectsItem', JSON.stringify(itemFromStorage));
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
    project.value = item.parentElement.parentElement.parentElement.childNodes[index].textContent;
    index = 3;
    projectStatus.options = item.parentElement.parentElement.parentElement.childNodes[index];
    index = 7;
    startDateId.value = item.parentElement.parentElement.parentElement.childNodes[index].textContent;
    index = 9;
    endDateId.value = item.parentElement.parentElement.parentElement.childNodes[index].textContent;
    index = 11;
    price.value = item.parentElement.parentElement.parentElement.childNodes[index].textContent;
    form.style.display = 'block';
    addProject.style.display = 'none';
    submit.addEventListener('click', function () {
        createProject();
    });
}

table.addEventListener('click', onClickItem);
document.addEventListener('DOMContentLoaded', function () {
    let itemsFromStorage = getFromStorage();
    itemsFromStorage.forEach(item => {
        createProject(item);
    });
    renderProject();
});