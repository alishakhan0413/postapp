

var userName = "";
var userEmail = "";
var userPassword = "";

var titles = [];
var descriptions = [];
var postImages = [];

var selectedImage = "./images/1.jpg";
var editIndex = -1;

// Signup and Login

function showSignup() {
    document.getElementById("signupForm").className = "card p-4 mx-auto formCard";
    document.getElementById("loginForm").className = "card p-4 mx-auto formCard d-none";
    document.getElementById("postPage").className = "d-none";
}

function showLogin() {
    document.getElementById("loginForm").className = "card p-4 mx-auto formCard";
    document.getElementById("signupForm").className = "card p-4 mx-auto formCard d-none";
    document.getElementById("postPage").className = "d-none";
}

function signup() {
    userName = document.getElementById("signupName").value;
    userEmail = document.getElementById("signupEmail").value;
    userPassword = document.getElementById("signupPassword").value;

    if (userName == "" || userEmail == "" || userPassword == "") {
        alert("Please fill all fields");
    }
    else {
        alert("Registration Successful!");

        document.getElementById("loginEmail").value = userEmail;
        document.getElementById("loginPassword").value = userPassword;

        showLogin();
    }
}

function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    if (email == userEmail && password == userPassword && email != "") {
        alert("Login Successful!");

        document.getElementById("signupForm").className = "d-none";
        document.getElementById("loginForm").className = "d-none";
        document.getElementById("postPage").className = "";
    }
    else {
        alert("Invalid Email or Password");
    }
}

// Image Selection

function selectImg(img) {
    selectedImage = img;

    var images = document.getElementsByClassName("bgImg");

    for (var i = 0; i < images.length; i++) {
        images[i].className = "bgImg";

        if (images[i].getAttribute("src") == img) {
            images[i].className = "bgImg selected";
        }
    }
}

// Create and Update Post

function post() {
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;

    if (title == "" || desc == "") {
        alert("Please enter name and description");
    }
    else {
        if (editIndex == -1) {
            titles.push(title);
            descriptions.push(desc);
            postImages.push(selectedImage);
        }
        else {
            titles[editIndex] = title;
            descriptions[editIndex] = desc;
            postImages[editIndex] = selectedImage;

            editIndex = -1;

            document.getElementById("createBtn").innerHTML = "Create Post";
        }

        document.getElementById("title").value = "";
        document.getElementById("desc").value = "";

        showPosts();
    }
}

function showPosts() {
    var container = document.getElementById("postContainer");

    container.innerHTML = "";

    for (var i = 0; i < titles.length; i++) {
        container.innerHTML += `
         <div class="col-12 col-md-6 mb-3">
         <div class="card postCard p-3"
         style="background-image: url('${postImages[i]}')">
         <div class="postContent p-3">
         <h2>${titles[i]}</h2>
         <p>${descriptions[i]}</p>
         <div class="d-flex gap-2">
    <button class="btn btn-warning" onclick="editPost(${i})">Edit</button>
     <button class="btn btn-danger" onclick="deletePost(${i})">Delete</button>
         </div>
     </div>
     </div>
     </div>
  `;
    }
}
function editPost(index) {
    document.getElementById("title").value = titles[index];
    document.getElementById("desc").value = descriptions[index];
    selectImg(postImages[index])
    editIndex = index;
    document.getElementById("createBtn").innerHTML = "Update Post";
}

function deletePost(index) {
    titles.splice(index, 1);
    descriptions.splice(index, 1);
    postImages.splice(index, 1);

    showPosts();
}
