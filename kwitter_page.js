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

  user_name = localStorage.getItem("user");
  room_name = localStorage.getItem("room_name");

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name : user_name,
        message : msg,
        likes : 0
    });
    document.getElementById("msg").innerHTML = " ";

}

function getData() 
{ firebase.database().ref("/"+room_name).on('value', function(snapshot) 
{ document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
 {childKey  = childSnapshot.key;  
    childData = childSnapshot.val(); 
    
    if(childKey != "purpose")
    {
     firebase_message_id = childKey;
     message_data = childData;

     console.log(firebase_message_id);
     console.log(message_data);

     name = message_data['name'];
     message = message_data['message'];
     like = message_data['like'];
      
     name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
     message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
     like_btn = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
     span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like : " + like + "</span></button><hr>";

     row = name_with_tag + message_with_tag + like_btn + span_with_tag;
     document.getElementById("output").innerHTML += row;

    }
});
});
}
   getData();

   function updateLike(message_id)
   {
      console.log("Click on like button " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log("Updated likes are " + updated_likes);
      
      firebase.database().ref(room_name).child(message_id).update({
          like : updated_likes
      });

   }    

   function logOut()
   {
       localStorage.removeItem("user");
       localStorage.removeItem("room_name");

       window.location.replace("index.html");
   }