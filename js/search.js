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
  let preSorted = sortStudents(9, data);
  presentStudents(preSorted);
  buttonListen(preSorted);

  input.addEventListener("input", () => {
    let userInput = input.value.toLowerCase();
    let filteredArr = compareNamesToInput(userInput); //returns filtered data from user input
    let postSorted = sortStudents(9, filteredArr);
    let removeListener = linkList.removeEventListener("click", listenCB, true);
    if (input.value === "") {
      removeListener;
      console.log("blank");
      presentStudents(preSorted);
      buttonListen(preSorted);
      // } else if (postSorted.every((e) => [""])) {
      //   console.log(true, postSorted);
      // studentList.innerHTML = `<p class="no-results">nobody home</p>`;
    } else {
      removeListener;
      console.log(postSorted);
      presentStudents(postSorted);
      buttonListen(postSorted);
    }

    //sorts filtered data into 9-item arrays
    // if (userInput === "") {
    //   //resets on blank input field
    //   presentStudents(x);
    //   console.log("reset");
    // } else if (filteredArr.every((e) => e === "")) {
    //   //handles no results
    //   studentList.innerHTML = `<li class="no-results">nobody home</li>`;
    //   linkList.innerHTML = ``;
    //   console.log("noresults");
    // } else {
    //   //presents filtered data, shows buttons, listens to buttons
    //   let sortedArr = sortStudents(9, filteredArr);
    //   presentStudents(sortedArr);
    //   x = sortedArr;
    //   console.log("else", x);
    // }
  });
}

searchField();
search();
