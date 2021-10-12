//declarations

const studentList = document.getElementsByClassName("student-list")[0];
const linkList = document.getElementsByClassName("link-list")[0];
const theFirstArray = sortStudents(9, data);
var value = "";
var theGreatArray = "";
var liArr = "";

//creates search field
function createSearchField() {
  const header = document.querySelector("header");
  header.insertAdjacentHTML(
    "beforeend",
    `
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
  `
  );
}

createSearchField();

//sorts data into arrays -- I love this function!
function sortStudents(limit, arr) {
  let pages = [[]];
  let pageLimit = limit;
  let pageIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i < pageLimit) {
      pages[pageIndex].push(arr[i]);
    } else {
      pageIndex++;
      pageLimit += limit;
      pages.push([arr[i]]);
    }
  }
  //corrects for blank pages which appear with certain limit values
  if (pages.slice(-1)[0].length === 0) {
    pages.splice(-1);
  }
  return pages;
}

//writes subarray html to the page
function writeStudentHTML(subarr) {
  let html = ``;
  for (let i = 0; i < subarr.length; i++) {
    let name = subarr[i].name.first + " " + subarr[i].name.last;
    let email = subarr[i].email;
    let joinDate = subarr[i].registered.date;
    html += `
    <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${subarr[i].picture.thumbnail}" alt="Profile Picture">
        <h3>${name}</h3>
        <span class="email">${email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${joinDate}</span>
      </div>
    </li>
    `;
  }
  studentList.innerHTML = html;
}

//makes buttons based on the pages array length
function makeButtons(ul) {
  let limit = sortStudents(9, data).length;
  let html = ``;
  for (let i = 1; i <= limit; i++) {
    html += `
    <li>
      <button type="button" class="js-button">${i}</button>
    </li>
    `;
  }
  ul.innerHTML = html;
  //initial active button
  liArr = document.getElementsByClassName("link-list")[0].children;
  liArr[0].children[0].className = "js-button active";
  //listener
  pageBtnListener(ul, liArr);
}

//btn listener
function pageBtnListener(ul, arr) {
  writeStudentHTML(theFirstArray[0]);
  ul.addEventListener("click", (e) => btnCB(e, arr));
}

//does the button things
function btnCB(e, arr) {
  if (e.target.tagName === "BUTTON") {
    //reset all button classes, show active
    for (let i = 0; i < arr.length; i++) {
      arr[i].children[0].className = "js-button";
    }
    e.target.className = "active";
    //show the content for the target
    let index = e.target.innerText;
    index = parseInt(index) - 1;
    if (value === "") {
      //resets for no input
      writeStudentHTML(theFirstArray[index]);
    } else {
      //write based on input
      writeStudentHTML(theGreatArray[index]);
    }
  }
}

//search field listener
function searchListen() {
  const searchField = document.getElementById("search");
  searchField.addEventListener("input", () => processInput(searchField));
}

//search field listener cb
function processInput(field) {
  value = field.value.toLowerCase();
  theGreatArray = filteredData(value);
  let length = theGreatArray.length;
  if (length < 1) {
    wipeButtons();
    studentList.innerHTML = `<li class="no-results">${noDice()}</li>`;
  } else if (length === 1) {
    writeStudentHTML(theGreatArray[0]);
    wipeButtons();
  } else {
    writeStudentHTML(theGreatArray[0]);
    for (let i = 0; i < liArr.length; i++) {
      //testing buttons for inclusion
      var button = liArr[i].children[0].innerText;
      button = parseInt(button);
      if (button > length) {
        liArr[i].style.display = "none";
      } else {
        liArr[i].style.display = "inline-block";
      }
    }
  }
}

function wipeButtons() {
  for (let i = 0; i < liArr.length; i++) {
    liArr[i].style.display = "none";
  }
}

//provides filtered data to be used in theGreatArray
function filteredData(input) {
  let filtered = [];
  for (let i = 0; i < data.length; i++) {
    const first = data[i].name.first;
    const last = data[i].name.last;
    const full = first + " " + last;
    if (full.toLowerCase().includes(input.toLowerCase())) {
      filtered.push(data[i]);
    }
  }
  filtered = sortStudents(9, filtered);
  return filtered;
}

function noDice() {
  let n = Math.floor(Math.random() * responses.length);
  return responses[n];
}

const responses = [
  "Not here.",
  "Can't find them.  Sorry.",
  "These are not the droids you're looking for.",
  "No dice, friend.  Sorry.",
  "Haven't seen them lately.",
  "Quit typing wrong things.",
  "They ain't here.",
  "We can't find them :(.",
];

//inital firing
makeButtons(linkList); //pagination buttons
searchListen(); //listens for input and manages button visibility
