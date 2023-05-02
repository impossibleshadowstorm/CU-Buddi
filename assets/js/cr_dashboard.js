var uid = localStorage.getItem("uid");

const crRef = firebase.firestore().collection("crs").document(uid).collection("worksheets");

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