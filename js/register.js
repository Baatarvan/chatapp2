function signUp() {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        window.location = 'login.html';
    })
    .catch((error) => {
        alert(error.message);
    });
}

function backToLogin() {
    window.location = 'login.html';
}