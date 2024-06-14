const apiWorks = await fetch("http://localhost:5678/api/works");

const btnLogin = document.getElementById("login");

const formCo = document.getElementById("formCo");
const errorAll = document.getElementById("errorAll");

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Gestion des erreurs, log-in

// La fonction prend deux arguments et affiche le message
// d'erreur si l'un des deux n'est pas valide
function setError(type, status) {
  if (type === "email" || type === "password")
    errorAll.style.display = status ? "block" : "none";
}
// Soumission du formulaire de connexion
formCo.addEventListener("submit", async function (event) {
  event.preventDefault();
  // Extrait les données du formulaire
  const formData = new FormData(formCo);
  // Récupère les valeurs des champs email et password
  const emailInputData = formData.get("email");
  const passwordInputData = formData.get("password");

  [
    { type: "email", status: false },
    { type: "password", status: false },
  ].forEach((error) => {
    setError(error.type, error.status);
  });

  // Vérification des erreurs
  // Création d'une table vide où l'on mettra les erreurs (cf l.52)
  const errors = [];
  // Si l'email est vide ou ne correspond pas au Regex, ajoute une erreur
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  if (emailInputData === "" || !emailRegex.test(emailInputData)) {
    console.log("email error");
    errors.push({ type: "email", status: true });
  }
  // Si le mdp est vide, ajoute une erreur
  if (passwordInputData === "") {
    console.log("password error");
    errors.push({ type: "password", status: true });
  }
  // Si des erreurs sont trouvées, elles sont affichées
  if (errors.length > 0) {
    errors.forEach((error) => {
      setError(error.type, error.status);
    });
    return;
  }
  // Envoi des données au serveur
  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInputData,
      password: passwordInputData,
    }),
  })
    // Extrait les données JSON de la réponse
    .then((response) => response.json())
    .then((data) => {
      // Si data.userID n'est pas présent, alors erreur
      if (!data?.userId) {
        console.log("Error");
      } else {
        // Sinon, le succès de la connexion est affiché avec l'ID utilisateur
        console.log("Success");
        console.log(data.userId);
        // Le token est enregistré dans le sessionStorage
        sessionStorage.setItem("token", data.token);
        console.log(data.token);
        // Redigire vers la page d'accueil lorsque l'utilisateur est connecté
        window.location.href = "index.html";
      }
    });
});

// Rajouter l'affichage de l'erreur de connexion lorsque l'e-mail
// est bon mais pas le mdp
// À demander : cliquer sur "projets" ou "login" fait apparaitre brièvement
// "logout", comment régler ce problème d'affichage ? .preventDefault ?
