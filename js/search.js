//creates the search field
function searchField() {
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

//filters data against search input
function compareNamesToInput(input) {
  let filteredObjects = [];
  for (let i = 0; i < 42; i++) {
    let first = data[i].name.first.toLowerCase();
    let last = data[i].name.last.toLowerCase();
    let full = first + " " + last;

    if (full.includes(input)) {
      filteredObjects.push(data[i]);
    }
  }
  return filteredObjects;
}

//page button listener, called back within search();
function pageButtonListen(parent, arr) {
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

//search box listener - fires on each input event
function search() {
  //displays search field
  searchField();

  //selects search field
  const input = document.getElementById("search");

  //intial sort without filtering
  let originalSortedArr = sortStudents(9, data);

  /* 
      After encountering problems with duplicate event listeners, I 
      decided to insert a second button menu below with it's own
      listener profile.  The code below seems like it ought not
      be so long, so I'm eager to get feedback on how to achieve
      greater concision.
  */

  //dynamic insertion of second button ul
  let pageDiv = document.getElementsByClassName("pagination")[0];
  pageDiv.style.display = "block";
  pageDiv.insertAdjacentHTML("beforeend", `<ul id="link-list-2"></ul>`);

  //selecting second button ul
  let linkList2 = document.getElementById("link-list-2"); //secondary button set
  linkList2.style.display = "none";

  //initial presentation and page button listening
  presentStudents(originalSortedArr);
  pageButtonListen(linkList, originalSortedArr);

  //input field listener with callback
  input.addEventListener("input", () => {
    let userInput = input.value.toLowerCase();
    let filteredArr = compareNamesToInput(userInput); //returns filtered data from user input
    let sorted = sortStudents(9, filteredArr); //sorts filtered data
    /* 
    
        I attempted to move this callback to a seperate function
        declaration, but was unsuccessful, as I encountered numerous
        problems related to variable scope.  Thus, I am not satsified
        with this code as it stands, but, on the bright side,
        it does seem to work.
      
    */

    if (input.value === "") {
      //restores originalSortedArr presentation upon instance of blank input field
      linkList.style.display = "block";
      linkList2.style.display = "none";
      presentStudents(originalSortedArr);
    } else if (sorted.length === 1) {
      //hides buttons if there is only 1 page
      linkList.style.display = "none";
      linkList2.style.display = "none";
      presentStudents(sorted);
    } else if (sorted.length < 1) {
      //no results
      let noResults = noDice[Math.floor(Math.random() * noDice.length)];
      studentList.innerHTML = `<p class="no-results">${noResults}</p>`;
      linkList.style.display = "none";
      linkList2.style.display = "none";
    } else {
      //filtered results with new page buttons
      console.log(sorted);
      presentStudents(sorted);
      linkList.style.display = "none"; //hides first ul set
      linkList2.style.display = "block"; //reveals second ul
      makeButtons(linkList2, sorted); //constructs second ul
      pageButtonListen(linkList2, sorted); //creates listeners for second ul
    }
  });
}

const noDice = [
  "We got nothing.",
  "Sorry.  Notta.",
  "They aren't here.",
  "No dice, friend.",
  "These are not the droids you're looking for.",
  "You're looking for who?",
  "They've been sacked.",
  "Oops.  Try again.",
  "Are any of us really here?",
  "Uh oh...",
  "They've gone fishing.",
];

search();
