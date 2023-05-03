var uid = localStorage.getItem("uid");
document.getElementById("crid").innerText=uid

const crRef = firebase
  .firestore()
  .collection("crs")
  .doc(uid)
  .collection("worksheets");

crRef.onSnapshot((querySnap) => {
  querySnap.docs.forEach((element) => {
    console.log(element.data());
    var child = `<li class="adobe-product" id="Worksheet-data">
      <div class="products">
        <span id="Subjetc">${element.data()["subject"]}</span>
      </div>
      <span class="status">
        <span class="status-circle green"></span>
        <span>Worksheet${element.data()["wks_no"]}</span> </span>
      <div class="button-wrapper">
        <button class="content-button status-button open"><span>7 </span>Days Left</button>
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
    document.getElementById("wks-ongoing").innerHTML +=child;
  });
});
