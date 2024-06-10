const apiWorks = await fetch("http://localhost:5678/api/works")

const btnLogin = document.getElementById("login")

btnLogin.addEventListener("click", function () {
        document.getElementById("introduction").style.display = "none"
        document.getElementById("portfolio").style.display = "none"
        document.getElementById("contact").style.display = "none"
        document.getElementById("connexion").style.display = "block"


})

// À faire :
// const sectionCo = document.getElementById("connexion")
// const logInTitle = document.createElement("h2")
// logInTitle.innerText = "Log In"
// const l = document.createElement("label");
// l.setAttribute.innerText = "lkdsnf"
// l.for = "blbl"

///////////////////////////////////////////////////////////////////////////////////

//Exemple:

// const f = document.createElement("form");
// f.setAttribute('method',"post");
// f.setAttribute('action',"submit.php");

// const i = document.createElement("input"); //input element, text
// i.setAttribute('type',"text");
// i.setAttribute('name',"username");

// const s = document.createElement("input"); //input element, Submit button
// s.setAttribute('type',"submit");
// s.setAttribute('value',"Submit");

// f.appendChild(i);
// f.appendChild(s);

// i.appendChild(l)

// //and some more input elements here
// //and dont forget to add a submit button

// document.getElementsByTagName('body')[0].appendChild(f);



// sectionCo.appendChild(f)
// sectionCo.appendChild(logInTitle)

