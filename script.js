let uniqId =('id'+(new Date()).getTime()).substring(0,12);

var formOpenBtn = document.getElementById("form-open");
var home = document.querySelector("#home");
var body = document.querySelector("body");
var formContainer = document.querySelector(".form_container");
var formCloseBtn = document.querySelector(".form_close");
var profileFormCloseBtn = document.querySelector(".profile_form_close");
var sidebarFormCloseBtn = document.querySelector(".sidebar_form_close");
var signupBtn = document.getElementById("signup");
var loginBtn = document.getElementById("login");
var pwShowHide = document.querySelectorAll(".pw_hide");
document.getElementById("loginError").style.display = "none";
document.getElementById("signupError").style.display = "none";
document.getElementById("userExistsError").style.display = "none";
document.getElementById("profile").style.visibility = "hidden";
document.getElementById("logout").style.display = "none";
document.getElementById("showServices").style.display = "none";
document.getElementById("showHistory").style.display = "none";
document.getElementById("manageProfile").style.display = "none";
formOpenBtn.addEventListener("click", () => {
  body.classList.add("show");
  document.getElementById("loginError").style.display = "none";
  document.getElementById("signupError").style.display = "none";
  document.getElementById("userExistsError").style.display = "none";
});
const logoutBtn = document.querySelectorAll(".logoutBtn");
logoutBtn.forEach((el) => {
  el.addEventListener("click", () => {
    document.getElementById("logout").style.display = "none";
    document.getElementById("form-open").style.display = "block";
    document.getElementById("profile").style.visibility = "hidden";
    document.getElementById("showServices").style.display = "none";
    document.getElementById("showHistory").style.display = "none";
    document.getElementById("ourServices").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("userName").textContent = "";
    document.querySelector("nav").classList.remove("open");
  });
});
formCloseBtn.addEventListener("click", () => {
  body.classList.remove("show");
});
profileFormCloseBtn.addEventListener("click", () => {
  body.classList.remove("show1");
});
sidebarFormCloseBtn.addEventListener("click", () => {
  document.querySelector("nav").classList.remove("open");
});
document.getElementById("userIconName").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("open");
});

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

// login now
document.getElementById("loginNow").addEventListener("click", onLogin);

function onLogin() {
  let users = JSON.parse(localStorage.getItem("user"));
  if (users) {
    users.forEach(function (user) {
      if (
        user.email === document.getElementById("loginEmail").value &&
        user.password === document.getElementById("loginPass").value
      ) {
        snackbar("User loggedIn Successfully...");
        body.classList.remove("show");
        document.getElementById("loginError").style.display = "none";
        document.getElementById("profile").style.visibility = "visible";
        document.getElementById("logout").style.display = "block";
        document.getElementById("form-open").style.display = "none";
        document.getElementById("userName").textContent = user.name;
        document.getElementById("sidebarUserName").textContent = user.name;
        document.getElementById("sidebarUserEmail").textContent = user.email;
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileEmailLabel").textContent = user.email;
        document.getElementById("showServices").style.display = "block";
        document.getElementById("showHistory").style.display = "block";
      } else {
        document.getElementById("loginError").style.display = "block";
      }
    });
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

// signup now
document.getElementById("signupNow").addEventListener("click", onSignup);

function onSignup() {
  let users = JSON.parse(localStorage.getItem("user")) || [];
  let userExists = false;
  users.forEach((user) => {
    if (user.email === document.getElementById("signupEmail").value) {
      userExists = true;
    }
  });
  if (userExists) {
    document.getElementById("userExistsError").style.display = "block";
  } else if (
    document.getElementById("signupPass1").value !==
    document.getElementById("signupPass2").value
  ) {
    document.getElementById("signupError").style.display = "block";
    document.getElementById("userExistsError").style.display = "none";
  } else {
    users.push({
      id:uniqId,
      name: document.getElementById("name").value,
      email: document.getElementById("signupEmail").value,
      password: document.getElementById("signupPass2").value,
    });
    formContainer.classList.remove("active");
    document.getElementById("signupError").style.display = "none";
    document.getElementById("userExistsError").style.display = "none";
    localStorage.setItem("user", JSON.stringify(users));
    snackbar("Registration Successful...");
  }
}

// snackbar
function snackbar(msg) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.textContent = msg;
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
// home
document.getElementById("home").style.display = "block";
document.getElementById("homePage").addEventListener("click", () => {
  document.getElementById("ourServices").style.display = "none";
  document.getElementById("home").style.display = "block";
  document.getElementById("ourClients").style.display = "none";
  document.getElementById("contactUs").style.display = "none";
});
// services
document.getElementById("ourServices").style.display = "none";
document.getElementById("showServices").addEventListener("click", () => {
  document.getElementById("ourServices").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("ourClients").style.display = "none";
  document.getElementById("contactUs").style.display = "none";
});

// clients
document.getElementById("ourClients").style.display = "none";
document.getElementById("showClients").addEventListener("click", () => {
  document.getElementById("ourServices").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("ourClients").style.display = "block";
  document.getElementById("contactUs").style.display = "none";
});

// contactus
document.getElementById("contactUs").style.display = "none";
document.getElementById("showContact").addEventListener("click", () => {
  document.getElementById("ourServices").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("ourClients").style.display = "none";
  document.getElementById("contactUs").style.display = "block";
});
// send mail
function sendMail() {
  const message = document.getElementById("contactMsg").value;
  const subject = document.getElementById("contactSubject").value;
  const name = document.getElementById("contactName").value;
  var link = `mailto:anikets20177@gmail.com?subject=${subject}&body=${message}`;
  window.location.href = link;
}

// slidding images
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2500); // Change image every 2 seconds
}

// sidebar
function toggleSidebar() {
  const navBar = document.querySelector("nav"),
    menuBtns = document.querySelectorAll(".menu-icon"),
    overlay = document.querySelector(".overlay");

  menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
      navBar.classList.toggle("open");
    });
  });

  overlay.addEventListener("click", () => {
    navBar.classList.remove("open");
  });
}
// save profile
document.getElementById('saveProfile').addEventListener("click",()=>{
  let profiles =  JSON.parse(localStorage.getItem("profiles")) || [];
  profiles.push({
    id:uniqId,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    mobile: document.getElementById("mobile").value,
    address1: document.getElementById("address1").value,
    address2: document.getElementById("address2").value,
    postcode: document.getElementById("postcode").value,
    area: document.getElementById("area").value,
    state: document.getElementById("state").value,
    country: document.getElementById("country").value,
    profileEmail: document.getElementById("profileEmail").value,
    education: document.getElementById("education").value,
    details: document.getElementById("details").value,
  });
  console.log(
    "profile",profiles
  )
  localStorage.setItem("profiles", JSON.stringify(profiles));
  body.classList.remove("show1");
  snackbar("Profile Updated Successfully...");
});

// show profile section
document.getElementById("manageAccountBtn").addEventListener("click", () => {
  body.classList.add("show1");
  document.getElementById("manageProfile").style.display = "block";
  document.querySelector("nav").classList.toggle("open");

  let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
  let users =JSON.parse(localStorage.getItem("user")) ||[];
  users.forEach(function (user) {
    profiles.forEach((profile)=>{
      if(user.id ===profile.id){
        console.log(profile)
          document.getElementById("firstName").value = profile.firstName;
          document.getElementById("lastName").value = profile.lastName;
          document.getElementById("mobile").value = profile.mobile;
          document.getElementById("address1").value = profile.address1;
          document.getElementById("address2").value = profile.address2;
          document.getElementById("postcode").value = profile.postcode;
          document.getElementById("area").value = profile.area;
          document.getElementById("state").value = profile.state;
          document.getElementById("country").value = profile.country;
          document.getElementById("profileEmail").value = profile.profileEmail;
          document.getElementById("education").value = profile.education;
          document.getElementById("details").value = profile.details;
      }
    });
   
  });
  console.log(document.getElementById("firstName").value);
  console.log(document.getElementById("mobile").value);
  console.log(document.getElementById("profileEmail").value);
});
