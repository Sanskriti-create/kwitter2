
var firebaseConfig = {
      apiKey: "AIzaSyBXc2ZM3HIkpLpYrmnhbZKtecF74uPCCb8",
      authDomain: "practice-2-65655.firebaseapp.com",
      databaseURL: "https://practice-2-65655-default-rtdb.firebaseio.com",
      projectId: "practice-2-65655",
      storageBucket: "practice-2-65655.appspot.com",
      messagingSenderId: "286666835519",
      appId: "1:286666835519:web:1672deeeb96139f1535a8a",
      measurementId: "G-GL61M6YWZ3"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    username = localStorage.getItem("user");
    document.getElementById("welcome").innerHTML = "Welcome " + username + " !!";

    function addRoom()
    {
          room_name = document.getElementById("room_name").value;
          firebase.database().ref("/").child(room_name).update({
                purpose : "new_room_added"
          });
          localStorage.setItem("room_name", room_name);
          window.location = "kwitter_page.html";
    }

    function getData() 
    { firebase.database().ref("/").on('value', function(snapshot) 
    { document.getElementById("output1").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
    { childKey = childSnapshot.key; Room_names = childKey; 
      console.log("Room Name - " + Room_names); 
    row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>"; 
    document.getElementById("output1").innerHTML += row; }); 
}); 
}

getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logOut()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

