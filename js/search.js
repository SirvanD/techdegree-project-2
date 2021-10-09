function searchField() {
  // creates search field in header
  var header = document.querySelector("header");
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

//assembles chunks of names for comparison to user input
function getChunks(parentArr, name) {
  chunk = "";
  for (let i = 0; i < name.length; i++) {
    chunk += name[i];
    parentArr.push(chunk);
  }
  return parentArr;
}

//populates arrays of name chunks for comparison to user input using .includes();
function convertNameToArr(firstname, lastname) {
  let nameArr = [];
  let first = firstname.toLowerCase().split("");
  let last = lastname.toLowerCase().split("");
  let full = firstname.toLowerCase() + " " + lastname.toLowerCase();

  getChunks(nameArr, first);
  getChunks(nameArr, last);
  getChunks(nameArr, full);

  for (let i = 0; i < full.length; i++) {
    nameArr.push(full[i]);
  }

  return nameArr;
}

//compares user input names using aforementioned converNameToArr() function
function compareNamesToInput(input) {
  let convertedName = "";
  let newData = [];
  for (let i = 0; i < 42; i++) {
    let first = data[i].name.first;
    let last = data[i].name.last;
    convertedName = convertNameToArr(first, last);
    if (convertedName.includes(input)) {
      newData.push(data[i]);
    }
  }
  return newData;
}

//search box listener - fires on each input event
function search() {
  const input = document.getElementById("search");
  let original = sortStudents(9, data);
  let pageDiv = document.getElementsByClassName("pagination")[0];
  pageDiv.insertAdjacentHTML("beforeend", `<ul id="link-list-2"></ul>`);
  let linkList2 = document.getElementById("link-list-2");
  linkList2.style.display = "none";
  presentStudents(original);
  listen(linkList, original);

  input.addEventListener("input", () => {
    let userInput = input.value.toLowerCase();
    let filteredArr = compareNamesToInput(userInput); //returns filtered data from user input
    let sorted = sortStudents(9, filteredArr);
    pageDiv.style.display = "block";

    if (input.value === "") {
      linkList.style.display = "block";
      linkList2.style.display = "none";
      presentStudents(original);
    } else if (sorted.length === 1) {
      presentStudents(sorted);
      pageDiv.style.display = "none";
    } else if (sorted.length < 1) {
      studentList.innerHTML = `<p class="no-results">no dice, dude.<p>`;
      pageDiv.style.display = "none";
    } else {
      presentStudents(sorted);
      linkList.style.display = "none";
      linkList2.style.display = "block";
      makeButtons(linkList2, sorted);
      listen(linkList2, sorted);
    }
  });
}

function listen(parent, arr) {
  parent.children[0].children[0].className = "active";
  //listens to ul
  parent.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      //precludes non-button ul click issues
      let button = e.target;
      let buttonNumber = parseInt(button.innerText);
      //resets buttons to prevent multiple "active"s
      for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].children[0].className = "";
      }
      button.className = "active";
      showStudents(arr[buttonNumber - 1]); //needs subarray, subtracts 1 to account for 0 index value
    }
  });
}

searchField();
search();
