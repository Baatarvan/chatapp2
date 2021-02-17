let db = firebase.firestore();
let $fullname = document.querySelector(".fullName");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    db.collection("users").doc(uid).get()
    .then((snapshot) => {
      if(snapshot.exists) {
        const user = snapshot.data();
        let {fname, lname} = user;
        $fullname.innerHTML = fname + " " + lname;
      } 
    }) 
  } else {
      console.log("Not Login");
  }
});

document.querySelector(".logout").onclick = () => {
    firebase.auth().signOut();
    window.location = 'login.html';
}

document.querySelector(".fullName").onclick = () =>{
    window.location = 'profile.html';
}