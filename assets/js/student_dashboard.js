var uid = localStorage.getItem("uid");
document.getElementById("crid").innerText = uid;

getAllTiles("worksheets");

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
      const diff =timestamp-now;
      const diffInDays = Math.abs(Math.floor(diff / (24 * 60 * 60 )));
      
      //Date Calculation End
      if(diffInDays>=0){
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
        }
        });
      });
    } else if (threadType == "assignments") {
      crRef.onSnapshot((querySnap) => {
        querySnap.docs.forEach((element) => {
  
          //Date Calculation Start
      const timestamp = element.data()["deadline"].seconds; 
      
      const now = Math.floor(Date.now()/1000);
      const diff =now-timestamp;
      const diffInDays = Math.abs(Math.floor(diff / (24 * 60 * 60 )));
      //Date Calculation End
      if(diffInDays>=0){
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
        }
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
      const diff =timestamp-now;
      const diffInDays = Math.floor(diff / (24 * 60 * 60 ));
     
      //Date Calculation End
            if(diffInDays>=0){
          var child = `<li class="adobe-product" id="Worksheet-data">
      <div class="products">
        <span id="Subject">${element.data()["notice_heading"]}</span>
      </div>
        <div class="button-wrapper">
        <button class="content-button status-button open"><span> ${diffInDays} </span>Days Left</button>
      </div>
    </li>`;
          document.getElementById("wks-ongoing").innerHTML += child;
        }
        });
      });
    }
  }
  