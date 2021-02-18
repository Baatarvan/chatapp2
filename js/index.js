let db = firebase.firestore();
let msg = document.querySelector(".typing");
let $email = document.querySelector(".email");
let me;
let uid;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    $email.innerHTML = `Welcome ${user.email}`;
    
    db.collection("users").doc(uid).get()
    .then((snapshot) => {
      if(snapshot.exists) {
        me = snapshot.data();
        let {fname, lname} = user;          
      }   
    }
  )}
  else {
    window.location = 'login.html';
}
});

document.querySelector(".logout").onclick = () => {
    firebase.auth().signOut();
    window.location = 'login.html';
}

document.querySelector(".email").onclick = () =>{
    window.location = 'profile.html';
}

// JS

document.querySelector('.sendBtn').onclick = () => {
  let $message = document.querySelector('.typing');
  let message = $message.value;
  if (message) {
    db.collection('messages').add({
      user: me.fname,
      uid: uid,
      message: message,
      created: new Date(), 
    }).then(() => {
      $message.value = '';
    })
  }
};

function drawMessage(message) {
  if (uid === message.uid) {
    let $item = document.createElement('div');
    let itemInnerHTML = `<p class=userNameTag>${message.user}</p>
      <div class="box flex">                      
          <div class="text flex flex-4">
              <p>${message.message}</p>
          </div>
          <div class="profile flex flex-1">X</div>
      </div>`;
  $item.className = 'mychat';
  $item.innerHTML = itemInnerHTML;
  return $item;  
  } else {
    let $item = document.createElement('div');
  let itemInnerHTML = `<p class=userNameTag>${message.user}</p>
      <div class="box flex">            
          <div class="profile flex flex-1">X</div>
          <div class="text flex flex-4">
              <p>${message.message}</p>
          </div>
      </div>`;
  $item.className = 'someonechat';
  $item.innerHTML = itemInnerHTML;
  return $item;    
  }
}

function drawMessages(messages) {
  let $container = document.querySelector('.allChats');
  $container.innerHTML = '';
  messages.forEach((message) => {
    let $item = drawMessage(message);
    $container.append($item);
  });
}

db.collection('messages').onSnapshot((snapshot) => {
  let messages = [];
  snapshot.forEach((doc) => {
    messages.push(doc.data());
  });
  drawMessages(messages);
});

