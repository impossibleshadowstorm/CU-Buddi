function loginCR() {
  var uid = document.getElementById("uid").value;
  var pass = document.getElementById("password").value;

  const crRef = firebase.firestore().collection("crs");

  if (uid.trim() == "") {
    document.getElementById("invalid_msg").innerText = "Invalid UID!!";
  } else if (pass.trim() == "") {
    document.getElementById("invalid_msg").innerText = "Invalid Password!!";
  } else {
    crRef.onSnapshot((querySnap) => {
      querySnap.docs.forEach((element) => {
        console.log(element.data()["name"]);
        if (element.data()["uid"] == uid) {
          if (element.data()["pass"] == pass) {
            location.href = "/CR.html";
            document.getElementById("invalid_msg").innerText = "";
            localStorage.setItem("code", "secret");
            localStorage.setItem("uid", uid);
            return;
          } else {
            document.getElementById("invalid_msg").innerText =
              "Invalid Password!!";
          }
        } else {
          // invalid user and password
          document.getElementById("invalid_msg").innerText =
            "No Username is registered!!";
        }
      });
    });
  }
}

function loginStudents() {
  var uid = document.getElementById("crUID").value;

  document.location.href = "/Student.html";

  return false;
}
