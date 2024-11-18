let container = document.getElementById('container');
let navBar = document.getElementById('nav-bar');
let menu = document.getElementById('menu');
let menuIcon = document.getElementById('menuIcon');
let removeMenu = document.getElementById('x');
let yourName = document.getElementById('yourName');
let firstName = localStorage.getItem('name');
let lastName = localStorage.getItem('surname');
yourName.innerHTML = `${firstName} ${lastName}`;
let projects = document.getElementById('projects');
let users = document.getElementById('users');
let leave = document.getElementById('leave');
let loan = document.getElementById('loan');
let notStarted = document.getElementById('notStarted');
let inProgress = document.getElementById('inProgress');
let completed = document.getElementById('completed');
 
let myData = JSON.parse(localStorage.getItem('employeItems'));
users.innerHTML = myData.length;
 
myData = JSON.parse(localStorage.getItem('leaveItems'));
leave.innerHTML = myData.length;

myData = JSON.parse(localStorage.getItem('projectsItem'));
projects.innerHTML = myData.length;

projectData = JSON.parse(localStorage.getItem('projectsItem'));
const total = projectData.reduce((accumulator, item) => {
    return accumulator + item["$price"];
}, 0);
loan.innerHTML = total;

let projectDataStatus = JSON.parse(localStorage.getItem('projectsItem'));
const notStartedStatus = "Not Started";
const countNotStarted = projectDataStatus.reduce((acc, item) => 
    item['$status'] === notStartedStatus ? ++acc : acc, 0);
notStarted.innerHTML = countNotStarted;

const inProgressStatus = "In Progress";
const countInProgress = projectDataStatus.reduce((acc, item) => 
    item['$status'] === inProgressStatus ? ++acc : acc, 0);
inProgress.innerHTML = countInProgress;

const completedStatus = "Completed";
const countCompleted = projectDataStatus.reduce((acc, item) => 
    item['$status'] === completedStatus ? ++acc : acc, 0);
completed.innerHTML = countCompleted;

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

//Project status Chart
const xValues = ["Not Started", "In Progress", "Completed"];
const yValues = [notStarted.innerHTML, inProgress.innerHTML, completed.innerHTML];
const barColors = [
  "#da3a64",
  "blueviolet",
  "#00aba9" 
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  }
});