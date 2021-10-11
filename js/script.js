//declarations

const studentList = document.getElementsByClassName("student-list")[0];
const linkList = document.getElementsByClassName("link-list")[0];

/*
    Sorts data into arrays.
    This function took a lot of cognitive strain to construct at my skill level, 
    and I consider it a slam dunk. 
*/

function sortStudents(limit, arr) {
  let pages = [[]];
  //limits the number of students per page
  let pageLimit = limit;
  //pageIndex sets the right subarray length limit within the pages array
  let pageIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i < pageLimit) {
      pages[pageIndex].push(arr[i]);
    } else {
      //adjusts values for next range of students, which get pushed into a new subarray within pages
      pageIndex++;
      pageLimit += limit;
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
function makeButtons(parent, arr) {
  let n = arr.length;
  let html = ``;
  for (let i = 1; i <= n; i++) {
    html += `
    <li>
      <button type="button">${i}</button>
    </li>
    `;
  }
  parent.innerHTML = html;
}

//constructs and displays student subarray on the page
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

function presentStudents(arr) {
  makeButtons(linkList, arr); //makes initial buttons based on arr and sets 1 to active initially -- had problems with listeners, so generated seperate buttons for search
  showStudents(arr[0]); //initial presentation of students at arr[0];
}
