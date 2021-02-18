document.querySelector('.signUp').onclick = function() {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        firebase.auth().signOut();
        backToLogin();
    })
    .catch((error) => {
        alert(error.message);
    });
}

function backToLogin() {
    window.location = 'login.html';
}