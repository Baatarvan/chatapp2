let db = firebase.firestore();
let $fName = document.querySelector(".fistname");
let $lName = document.querySelector(".lastname");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        console.log(uid);
        db.collection("users").doc(uid).get()
        .then((snapshot) => {
            if(snapshot.exists) {
                const user = snapshot.data();
                let {fname, lname} = user;
                $fName.value = fname;
                $lName.value = lname;                
            }
        })
    } else {
        console.log("Not Login");
        window.location = "login.html";
    }
});

document.querySelector(".save").onclick = () => {
    db.collection("users").doc(firebase.auth().currentUser.uid).set({
        fname: $fName.value,
        lname: $lName.value,
    })
    .then(() => {
        console.log("Document successfully written!");
        window.location = "index.html";
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}
