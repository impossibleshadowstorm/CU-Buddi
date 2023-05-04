var uid = localStorage.getItem("uid");
document.getElementById("crid").innerText = uid;

getAllTiles("worksheets");

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
  }
  else if (document.getElementById("assignment-radio").checked) {
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
  }
  else if (document.getElementById("announcement-radio").checked) {
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
        notice: document.getElementById("about").value
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
    crRef.onSnapshot((querySnap) => {
      querySnap.docs.forEach((element) => {

    //Date Calculation Start
    const timestamp = element.data()["deadline"].seconds; 
    
    const now = Math.floor(Date.now()/1000);
    const diff =now-timestamp;
    const diffInDays = Math.abs(Math.floor(diff / (24 * 60 * 60 * 1000)));
    console.log(diffInDays);
    //Date Calculation End

        var child = `<li class="adobe-product" id="Worksheet-data">
    <div class="products">
      <span id="Subject">${element.data()["subject"]}</span>
    </div>
    <span class="status">
      <span class="status-circle green"></span>
      <span>Worksheet ${element.data()["wks_no"]}</span> </span>
    <div class="button-wrapper">
      <button class="content-button status-button open"><span>${diffInDays} </span>Days Left</button>
      <div class="menu">
        <button class="dropdown">
          <ul>
            <li><a href="#">Update</a></li>
            <li><a href="#">Delete</a></li>
          </ul>
        </button>
      </div>
    </div>
  </li>`;
        document.getElementById("wks-ongoing").innerHTML += child;
      });
    });
  } else if (threadType == "assignments") {
    crRef.onSnapshot((querySnap) => {
      querySnap.docs.forEach((element) => {

        //Date Calculation Start
    const timestamp = element.data()["deadline"].seconds; 
    
    const now = Math.floor(Date.now()/1000);
    const diff =now-timestamp;
    const diffInDays = Math.abs(Math.floor(diff / (24 * 60 * 60 * 1000)));
    console.log(diffInDays);
    //Date Calculation End

        var child = `<li class="adobe-product" id="Worksheet-data">
    <div class="products">
      <span id="Subject">${element.data()["subject"]}</span>
    </div>
    <span class="status">
      <span class="status-circle green"></span>
      <span>Assignment ${element.data()["assignment_no"]}</span> </span>
      <div class="button-wrapper">
      <button class="content-button status-button open"><span>${diffInDays} </span>Days Left</button>
    </div>
  </li>`;
        document.getElementById("wks-ongoing").innerHTML += child;
        // finalList =`${finalList}${child}`;
      });
    });
    // document.getElementById("wks-ongoing").innerHTML = finalList;
    // console.log(finalList)
  } else if (threadType == "announcements") {
    crRef.onSnapshot((querySnap) => {
      querySnap.docs.forEach((element) => {

        //Date Calculation Start
    const timestamp = element.data()["deadline"].seconds; 
    
    const now = Math.floor(Date.now()/1000);
    const diff =now-timestamp;
    const diffInDays = Math.abs(Math.floor(diff / (24 * 60 * 60 * 1000)));
    console.log(diffInDays);
    //Date Calculation End

        var child = `<li class="adobe-product" id="Worksheet-data">
    <div class="products">
      <span id="Subject">${element.data()["notice_heading"]}</span>
    </div>
      <div class="button-wrapper">
      <button class="content-button status-button open"><span> ${diffInDays} </span>Days Left</button>
    </div>
  </li>`;
        document.getElementById("wks-ongoing").innerHTML += child;
      });
    });
  }
}

// const crRef = firebase
//   .firestore()
//   .collection("crs")
//   .doc(uid)
//   .collection("worksheets");

// crRef.onSnapshot((querySnap) => {
//   querySnap.docs.forEach((element) => {
//     console.log(element.data());
//     var child = `<li class="adobe-product" id="Worksheet-data">
//       <div class="products">
//         <span id="Subject">${element.data()["subject"]}</span>
//       </div>
//       <span class="status">
//         <span class="status-circle green"></span>
//         <span>Worksheet ${element.data()["wks_no"]}</span> </span>
//       <div class="button-wrapper">
//         <button class="content-button status-button open"><span>7 </span>Days Left</button>
//         <div class="menu">
//           <button class="dropdown">
//             <ul>
//               <li><a href="#">Update</a></li>
//               <li><a href="#">Delete</a></li>
//             </ul>
//           </button>
//         </div>
//       </div>
//     </li>`;
//     document.getElementById("wks-ongoing").innerHTML +=child;
//   });
// });
