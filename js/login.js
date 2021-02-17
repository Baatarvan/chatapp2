document.querySelector(".signIn").onclick = () => {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        window.location = 'index.html';
    })
    .catch((error) => {
        alert(error.message);
    });

}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      window.location = "index.html";
    } else {
        console.log("Not Login");
    }
});

document.querySelector(".lastchild").onclick = () => {
    window.location = 'register.html';
}