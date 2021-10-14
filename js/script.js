/*------------------------------

    INITIAL DECLARATIONS

------------------------------*/

const studentList = document.getElementsByClassName("student-list")[0];
const linkList = document.getElementsByClassName("link-list")[0];
const theFirstArray = sortStudents(9, data);
var value = ""; //will reflect user input
var theGreatArray = ""; //will be an array of arrays built based on user input
var liArr = ""; //will represent link-list li elements

/*------------------------------------------

    INITIAL PRESENTATIONS AND CALLBACKS

------------------------------------------*/

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

//sorts data from data.js into arrays.  I love this function!
function sortStudents(limit, arr) {
  let pages = [[]]; //creates empty initial subarray
  let pageLimit = limit; //limits number of objects per subarray based on data index
  let pageIndex = 0; //index of first subarray
  for (let i = 0; i < arr.length; i++) {
    if (i < pageLimit) {
      pages[pageIndex].push(arr[i]); //pushes data object into current subarray
    } else {
      pageIndex++; //moves to next subarray
      pageLimit += limit; //sets new limit for index inclusion in next subarray
      pages.push([arr[i]]); //pushes current arr[i] into new subarray
    }
  }
  //corrects for blank pages which appear with certain limit values
  if (pages.slice(-1)[0].length === 0) {
    pages.splice(-1); //removes empty array
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

/*---------------

    BUTTONS

---------------*/

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
      //value was created in initial declarations and set in processInput(field)
      //resets for no input
      writeStudentHTML(theFirstArray[index]); //theFirstArray reflects the first sorting of data from data.js for pagination
    } else {
      //write based on user clicks
      writeStudentHTML(theGreatArray[index]); //theGreatArray represents data from data.js filtered against user input and formatted for pagination
    }
  }
}

/*-------------

    SEARCH

-------------*/

//search field listener
function searchListen() {
  const searchField = document.getElementById("search");
  searchField.addEventListener("input", () => processInput(searchField));
}

//search field listener cb -- processes input from user
function processInput(field) {
  value = field.value.toLowerCase(); //grabs user input / transforms to lowercase for comparison
  theGreatArray = filteredData(value); //filters data against user input
  let length = theGreatArray.length;
  if (length < 1) {
    //no-results
    wipeButtons(); //hides buttons
    studentList.innerHTML = `<li class="no-results">${noDice()}</li>`;
  } else if (length === 1) {
    //one-page results
    writeStudentHTML(theGreatArray[0]); //writes results to page
    wipeButtons(); //hides buttons
  } else {
    //multi-page results
    writeStudentHTML(theGreatArray[0]); //writes first page of results to page
    resetActiveButton(); //resets button classes to "", button 1 to "active"
    for (let i = 0; i < liArr.length; i++) {
      //tests buttons for inclusion
      var button = liArr[i].children[0].innerText;
      button = parseInt(button); //grabs number object from button
      if (button > length) {
        liArr[i].style.display = "none"; //hides unnecessary buttons
      } else {
        liArr[i].style.display = "inline-block"; //shows appropriate buttons
      }
    }
  }
}

//provides filtered data to be used in theGreatArray
function filteredData(input) {
  //accepts value from processInput();
  let filtered = []; //will contain filtered objects from data / data.js
  for (let i = 0; i < data.length; i++) {
    const first = data[i].name.first;
    const last = data[i].name.last;
    const full = first + " " + last;
    if (full.toLowerCase().includes(input.toLowerCase())) {
      //uses .includes to find matches
      filtered.push(data[i]); //pushes matches to filtered []
    }
  }
  filtered = sortStudents(9, filtered); //organizes matches in 9-length subarrays for presentation
  return filtered;
}

//hides buttons when unneeded
function wipeButtons() {
  for (let i = 0; i < liArr.length; i++) {
    liArr[i].style.display = "none";
  }
}

//resets active button to match page with user input
function resetActiveButton() {
  for (let i = 0; i < liArr.length; i++) {
    liArr[i].children[0].className = ""; //makes all buttons inactive
  }
  liArr[0].children[0].className = "active"; //sets button 1 active
}

//no results response messages, randomly selected from const responses
function noDice() {
  let n = Math.floor(Math.random() * responses.length); //n = random number
  return responses[n]; //returns response by randomly-selected n index number
}

//random responses for no-results pages (not in the rubric, just for fun)
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

/*---------------------

    INITIAL FIRINGS

---------------------*/

makeButtons(linkList); //pagination buttons
searchListen(); //listens for input and manages button visibility/class
