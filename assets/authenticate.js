function loginCR() {
  var uid = document.getElementById("uid").value;
  var pass = document.getElementById("password").value;

  const crRef = firebase.firestore().collection("crs");

  crRef.onSnapshot((querySnap) => {
    querySnap.docs.forEach((element) => {
      console.log(element.data()["name"]);
      if (element.data()["uid"] == uid) {
        if (element.data()["pass"] == pass) {
          location.href = "/Post_Notice.html";
          return;
        }
        else{
            // invalid password
        }
      }
      else{
        // invalid user and password
      }
    });
  });
}
