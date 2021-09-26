function username()
{
    user = document.getElementById("user").value;

    localStorage.setItem("user", user);

    window.location = "kwitter_room.html";
}