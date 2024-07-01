// ********************************************************************************************* VARIABLE(S)

// Api variables & constants
const apiWorks = await fetch("http://localhost:5678/api/works");

const btnLogin = document.getElementById("login");

const formCo = document.getElementById("form-co");
const errorAll = document.getElementById("error-all");

// ****************************************************************************************** FETCH FUNCTION

// Fonction pour afficher ou masquer les erreurs
function setError(display) {
  errorAll.style.display = display ? "flex" : "none";
}

// Fonction pour valider les champs du formulaire
function validateForm(email, password) {
  const errors = [];
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,}$/i;

  if (!email || !emailRegex.test(email)) {
    errors.push("email");
  }
  if (!password) {
    errors.push("password");
  }
  return errors;
}

// Soumission du formulaire de connexion
formCo.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(formCo);
  const emailInputData = formData.get("email");
  const passwordInputData = formData.get("password");

  setError(false);

  const errors = validateForm(emailInputData, passwordInputData);
  if (errors.length > 0) {
    setError(true);
    return;
  }

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInputData,
        password: passwordInputData,
      }),
    });
    const data = await response.json();
    if (!data?.userId) {
      setError(true);
    } else {
      sessionStorage.setItem("token", data.token);
      window.location.href = "index.html";
    }
  } catch (error) {
    setError(true);
  }
});
