var formOpenBtn = document.getElementById("form-open");
var home = document.querySelector("#home");
var body = document.querySelector("body");
var formContainer = document.querySelector(".form_container");
var formCloseBtn = document.querySelector(".form_close");
var signupBtn = document.getElementById("signup");
var loginBtn = document.getElementById("login");
var pwShowHide = document.querySelectorAll(".pw_hide");
document.getElementById("loginError").style.display = "none";
document.getElementById("signupError").style.display = "none";
document.getElementById("userExistsError").style.display = "none";
document.getElementById("profile").style.visibility = "hidden";
document.getElementById("logout").style.display = "none";
document.getElementById("showServices").style.display = "none";
formOpenBtn.addEventListener('click', () => {
  body.classList.add("show");
  document.getElementById("loginError").style.display = "none";
  document.getElementById("signupError").style.display = "none";
  document.getElementById("userExistsError").style.display = "none";
});
document.getElementById('logout').addEventListener('click',()=>{
  document.getElementById("logout").style.display = "none";
  document.getElementById("form-open").style.display = "block";
  document.getElementById("profile").style.visibility = "hidden";
  document.getElementById("showServices").style.display = "none";
  document.getElementById("userName").textContent = '';
})
formCloseBtn.addEventListener("click", () => {
  body.classList.remove("show");
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
  if(users){
    users.forEach(function (user) {
      if (
        user.email === document.getElementById("loginEmail").value &&
        user.password === document.getElementById("loginPass").value
      ) {
        snackbar("User loggedIn Successfully...");
        body.classList.remove("show");
        document.getElementById("loginError").style.display = "none";
        document.getElementById("profile").style.visibility ='visible';
        document.getElementById("logout").style.display ='block';
        document.getElementById("form-open").style.display = "none";
        document.getElementById("userName").textContent = user.name;
        document.getElementById("showServices").style.display = "block";
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
      name: document.getElementById("name").value,
      email: document.getElementById("signupEmail").value,
      password: document.getElementById("signupPass2").value,
    });
    formContainer.classList.remove("active");
    document.getElementById("signupError").style.display = "none";
    document.getElementById("userExistsError").style.display = "none";
    localStorage.setItem("user", JSON.stringify(users));
    snackbar("Registration Successfull...");
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
document.getElementById("home").style.display='block';
document.getElementById("homePage").addEventListener("click", ()=>{
  document.getElementById("ourServices").style.display='none';
  document.getElementById("home").style.display='block';
  document.getElementById("ourClients").style.display='none';
  document.getElementById("contactUs").style.display='none';
});
// services
document.getElementById("ourServices").style.display='none';
document.getElementById("showServices").addEventListener("click", ()=>{
  document.getElementById("ourServices").style.display='block';
  document.getElementById("home").style.display='none';
  document.getElementById("ourClients").style.display='none';
  document.getElementById("contactUs").style.display='none';
});

// clients
document.getElementById("ourClients").style.display='none';
document.getElementById("showClients").addEventListener("click", ()=>{
  document.getElementById("ourServices").style.display='none';
  document.getElementById("home").style.display='none';
  document.getElementById("ourClients").style.display='block';
  document.getElementById("contactUs").style.display='none';
});

// contactus
document.getElementById("contactUs").style.display='none';
document.getElementById("showContact").addEventListener("click", ()=>{
  document.getElementById("ourServices").style.display='none';
  document.getElementById("home").style.display='none';
  document.getElementById("ourClients").style.display='none';
  document.getElementById("contactUs").style.display='block';
});
// send mail
function sendMail() {
  const message = document.getElementById('contactMsg').value;
  const subject = document.getElementById('contactSubject').value;
  const name =document.getElementById('contactName').value
  var link = `mailto:anikets20177@gmail.com?subject=${subject}&body=${message}`;
  window.location.href = link;
}

// slidding images
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeDot", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " activeDot";
}