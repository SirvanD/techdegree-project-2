//declarations

const studentList = document.getElementsByClassName("student-list")[0];
const linkList = document.getElementsByClassName("link-list")[0];

/*
    Sorts data into arrays, where "n" represents the desired array quantity limit.
    This function took a lot of cognitive strain to construct at my skill level, 
    and I consider it a slam dunk. 
*/

function sortStudents(n, arr) {
  let pages = [[]];
  let pageLimit = n; //n limits the number of students per page
  let pageIndex = 0; //pageIndex sets the right subarray value within the pages array
  for (let i = 0; i < arr.length; i++) {
    if (i < pageLimit) {
      pages[pageIndex].push(arr[i]);
    } else {
      //adjusts values for next range of students, which get pushed into a new subarray within pages
      pageIndex++;
      pageLimit += n;
      pages.push([arr[i]]); //creates new subarray & pushes else item into it
    }
  }
  //corrects for blank pages which appear with certain n values
  if (pages.slice(-1)[0].length === 0) {
    pages.splice(-1);
  }
  return pages;
}

//makes buttons based on the pages array length
function makeButtons(arr) {
  let n = arr.length;
  let html = ``;
  for (let i = 1; i <= n; i++) {
    html += `
    <li>
      <button type="button">${i}</button>
    </li>
    `;
  }
  linkList.innerHTML = html;
}

function showStudents(subarr) {
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

//listens for dom events via bubbling to linkList
function buttonListen(arr) {
  linkList.children[0].children[0].className = "active";
  //listens to ul
  linkList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      //precludes non-button ul click issues
      let button = e.target;
      let buttonNumber = parseInt(button.innerText);
      //resets buttons to prevent multiple "active"s
      for (let i = 0; i < linkList.children.length; i++) {
        linkList.children[i].children[0].className = "";
      }
      button.className = "active";
      showStudents(arr[buttonNumber - 1]); //needs subarray, subtracts 1 to account for 0 index value
    }
  });
}

function presentStudents(arr) {
  makeButtons(arr); //makes buttons based on arr and sets 1 to active initially
  showStudents(arr[0]); //initial presentation of students at arr[0];
  buttonListen(arr); //listens to buttons / resets formatting in cb
}

presentStudents(sortStudents(9, data));
