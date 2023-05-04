var uid = localStorage.getItem("uid");
document.getElementById("crid").innerText = uid;

getAllTiles("worksheets");
var check_menu = 0;

function createThread() {
  if (document.getElementById("wks-radio").checked) {
    firebase
      .firestore()
      .collection("crs")
      .doc(uid)
      .collection("worksheets")
      .add({
        creation_time: firebase.firestore.Timestamp.fromDate(new Date()),
        deadline: firebase.firestore.Timestamp.fromDate(
          new Date(document.getElementById("wks-dead-date").value)
        ),
        subject: document.getElementById("wks-subject").value,
        wks_no: document.getElementById("wks-no").value,
      });
    console.log("done");
  } else if (document.getElementById("assignment-radio").checked) {
    firebase
      .firestore()
      .collection("crs")
      .doc(uid)
      .collection("assignments")
      .add({
        creation: firebase.firestore.Timestamp.fromDate(new Date()),
        deadline: firebase.firestore.Timestamp.fromDate(
          new Date(document.getElementById("wks-dead-date").value)
        ),
        subject: document.getElementById("wks-subject").value,
        assignment_no: document.getElementById("wks-no").value,
      });
    console.log("done");
  } else if (document.getElementById("announcement-radio").checked) {
    firebase
      .firestore()
      .collection("crs")
      .doc(uid)
      .collection("announcements")
      .add({
        creation: firebase.firestore.Timestamp.fromDate(new Date()),
        deadline: firebase.firestore.Timestamp.fromDate(
          new Date(document.getElementById("wks-dead-date").value)
        ),
        notice_heading: document.getElementById("wks-notice-heading").value,
        notice: document.getElementById("about").value,
      });
    console.log("done");
  }
}

function getAllTiles(threadType) {
  const crRef = firebase
    .firestore()
    .collection("crs")
    .doc(uid)
    .collection(threadType);

  document.getElementById("wks-ongoing").innerHTML = "";

  if (threadType == "worksheets") {
    check_menu = 0;
    crRef.onSnapshot((querySnap) => {
      querySnap.docs.forEach((element) => {
        //Date Calculation Start
        const timestamp = element.data()["deadline"].seconds;
        const now1 = Date.now();

        const now = Math.floor(now1 / 1000);

        const diff = timestamp - now;
        const diffInDays = Math.abs(Math.floor(diff / (24 * 60 * 60)));

        //Date Calculation End

        var child = `<li class="adobe-product" id="${element.id}">
    <div class="products">
      <span id="Subject">${element.data()["subject"]}</span>
    </div>
    <span class="status">
      <span class="status-circle green"></span>
      <span>Worksheet ${element.data()["wks_no"]}</span> </span>
    <div class="button-wrapper">
      <button class="content-button status-button open"><span>${diffInDays} </span>Days Left</button>
      &nbsp;&nbsp;&nbsp;
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="24" height="24"
      onclick="deleteCard(${element.id})"
      viewBox="0,0,256,256"
      style="fill:#000000;">
      <g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-6v2h18v-2h-6l-1,-1zM4.36523,7l1.70313,15h11.86328l1.70313,-15z"></path></g></g>
      </svg>
    </div>
  </li>`;
        document.getElementById("wks-ongoing").innerHTML += child;
      });
    });
  } else if (threadType == "assignments") {
    check_menu = 1;
    crRef.onSnapshot((querySnap) => {
      querySnap.docs.forEach((element) => {
        //Date Calculation Start
        const timestamp = element.data()["deadline"].seconds;

        const now = Math.floor(Date.now() / 1000);
        const diff = now - timestamp;
        const diffInDays = Math.abs(Math.floor(diff / (24 * 60 * 60)));
        //Date Calculation End

        var child = `<li class="adobe-product">
    <div class="products">
      <span id="Subject">${element.data()["subject"]}</span>
    </div>
    <span class="status">
      <span class="status-circle green"></span>
      <span>Assignment ${element.data()["assignment_no"]}</span> </span>
      <div class="button-wrapper">
      <button class="content-button status-button open"><span>${diffInDays} </span>Days Left</button>
      &nbsp;&nbsp;&nbsp;
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      id="${element.id}"
      onclick="deleteCard(${element.id})"
      width="24" height="24"
      viewBox="0,0,256,256"
      style="fill:#000000;">
      <g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-6v2h18v-2h-6l-1,-1zM4.36523,7l1.70313,15h11.86328l1.70313,-15z"></path></g></g>
      </svg>
    </div>
  </li>`;
        document.getElementById("wks-ongoing").innerHTML += child;
        // finalList =`${finalList}${child}`;
      });
    });
    // document.getElementById("wks-ongoing").innerHTML = finalList;
    // console.log(finalList)
  } else if (threadType == "announcements") {
    check_menu = 2;
    crRef.onSnapshot((querySnap) => {
      querySnap.docs.forEach((element) => {
        //Date Calculation Start
        const timestamp = element.data()["deadline"].seconds;

        const now = Math.floor(Date.now() / 1000);
        const diff = now - timestamp;
        const diffInDays = Math.abs(Math.floor(diff / (24 * 60 * 60)));

        //Date Calculation End

        var child = `<li class="adobe-product">
    <div class="products">
      <span id="Subject">${element.data()["notice_heading"]}</span>
    </div>
      <div class="button-wrapper">
      <button class="content-button status-button open"><span> ${diffInDays} </span>Days Left</button>
      &nbsp;&nbsp;&nbsp;
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      onclick="deleteCard(${element.id})"
      width="24" height="24"
      viewBox="0,0,256,256"
      style="fill:#000000;">
      <g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-6v2h18v-2h-6l-1,-1zM4.36523,7l1.70313,15h11.86328l1.70313,-15z"></path></g></g>
      </svg>
    </div>
  </li>`;
        document.getElementById("wks-ongoing").innerHTML += child;
      });
    });
  }
}

async function deleteCard(id) {
  if (check_menu == 0) {
        await firebase
          .firestore()
          .collection("crs")
          .doc(uid)
          .collection("worksheets")
          .doc(id.id)
          .delete();
        getAllTiles("worksheets");
      } else if (check_menu == 1) {
        await firebase
          .firestore()
          .collection("crs")
          .doc(uid)
          .collection("assignments")
          .doc(id.id)
          .delete();
        getAllTiles("assignments");
      } else if (check_menu == 2) {
        await firebase
          .firestore()
          .collection("crs")
          .doc(uid)
          .collection("announcements")
          .doc(id.id)
          .delete();
        getAllTiles("announcements");
      }
    
}

// function getEventTarget(e) {
//   e = e || window.event;
//   return e.target || e.srcElement;
// }

// var ul = document.getElementById("wks-ongoing");
// ul.onclick = function (event) {
//   var target = getEventTarget(event);
//   if (check_menu == 0) {
//     firebase
//       .firestore()
//       .collection("crs")
//       .doc(uid)
//       .collection("worksheets")
//       .doc(target.id)
//       .delete();
//     getAllTiles("worksheets");
//   } else if (check_menu == 1) {
//     firebase
//       .firestore()
//       .collection("crs")
//       .doc(uid)
//       .collection("assignments")
//       .doc(target.id)
//       .delete();
//     getAllTiles("assignments");
//   } else if (check_menu == 2) {
//     firebase
//       .firestore()
//       .collection("crs")
//       .doc(uid)
//       .collection("announcements")
//       .doc(target.id)
//       .delete();
//     getAllTiles("announcements");
//   }
//   console.log(target.id);
// };
