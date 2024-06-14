// const apiWorks = await fetch("http://localhost:5678/api/works");

const btnLogout = document.getElementById("logout");
const btnLogin = document.getElementById("login");
const filters = document.querySelector(".filters");
const editionModeDiv = document.querySelector(".editionMode");

let sessionToken = sessionStorage.getItem("token");

if (sessionToken !== null) {
  btnLogout.style.display = "block";
  btnLogin.style.display = "none";
  filters.style.display = "none";
  console.log("Connected");
  addElement();
} else {
  btnLogout.style.display = "none";
  btnLogin.style.display = "block";
  console.log("Disconnected");
}
function addElement() {
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const titlePortfolio = document.getElementById("mesProjets");
  let divEdition = document.querySelector("editionMode");
  if (!divEdition) {
    // header
    divEdition = document.createElement("div");
    divEdition.className = "editionMode";
    const i = document.createElement("i");
    i.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    const p = document.createElement("p");
    p.innerText = "Mode édition";
    header.className = "marginHeader";
    // portfolio
    const divModifier = document.createElement("div");
    divModifier.className = "modifierProjets";
    const m = document.createElement("button");
    m.innerText = "modifier";
    m.setAttribute("id", "btnModifier");
    const iM = document.createElement("i");
    iM.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

    body.insertBefore(divEdition, body.firstChild);
    divEdition.appendChild(i);
    divEdition.appendChild(p);
    divEdition.style.display = "flex";
    titlePortfolio.appendChild(divModifier);
    divModifier.appendChild(iM);
    divModifier.appendChild(m);

    ///////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// Génération de la modale

    // Création de la modale et de ses composants
    const modal = document.createElement("div");
    modal.setAttribute("id", "modalId");
    modal.className = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent";

    const modalCloseBtn = document.createElement("span");
    modalCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    modalCloseBtn.className = "closeBtn";

    const modalTitle = document.createElement("h2");
    modalTitle.innerText = "Galerie Photo";

    const photoList = document.createElement("div");
    photoList.setAttribute("id", "photoList");
    photoList.className = "photoList";

    const btnAjout = document.createElement("button");
    btnAjout.innerText = "Ajouter une photo";

    modalContent.appendChild(modalCloseBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(photoList);
    modalContent.appendChild(btnAjout);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Fonction pour ajouter un bouton de suppression à une image
    function addDeleteButtonToImage(image) {
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";

      const deleteImgBtn = document.createElement("button");
      deleteImgBtn.setAttribute("id", "deleteImgBtn");
      deleteImgBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      deleteImgBtn.onclick = function () {
        // wrapper.remove();
      };

      wrapper.appendChild(image);
      wrapper.appendChild(deleteImgBtn);
      photoList.appendChild(wrapper); // Ajouter le wrapper à photoList
    }

    // Fonction pour générer les photos à partir de l'API
    function genPhoto(apiPhotoList) {
      apiPhotoList.forEach((article) => {
        const photos = document.createElement("img");
        photos.src = article.imageUrl;
        addDeleteButtonToImage(photos); // Ajouter le bouton de suppression immédiatement
      });
    }

    // Récupération des données de l'API
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((apiPhotoList) => {
        genPhoto(apiPhotoList); // Générer les photos avec les données récupérées
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données : ", error)
      );

    const btnModifier = document.getElementById("btnModifier");
    btnModifier.onclick = function () {
      modal.style.display = "flex";
    };
    modalCloseBtn.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}
