import { genWorks } from "./projets.js";

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// Affichage du mode édition

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

/////////////////////////////////////////// Génération des photos à partir de l'API
function genPhoto() {
  const photoList = document.getElementById("photoList");

  photoList.innerHTML = "";

  // Récupération des données de l'API
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((apiPhotoList) => {
      // Génération des photos avec les données récupérées
      apiPhotoList.forEach((article) => {
        const photos = document.createElement("img");
        photos.src = article.imageUrl;

        const id = article.id;

        // Ajoute le bouton de suppression immédiatement
        const wrapper = document.createElement("div");
        wrapper.className = "image-wrapper";

        const deleteImgBtn = document.createElement("button");
        deleteImgBtn.setAttribute("id", "deleteImgBtn");
        deleteImgBtn.setAttribute("type", "button");
        deleteImgBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        deleteImgBtn.onclick = async function (event) {
          event.preventDefault();
          console.log(id);

          try {
            const response = await fetch(
              `http://localhost:5678/api/works/${id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${sessionToken}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Erreur lors de la suppresion de l'image.");
            }

            console.log(`Image avec l'ID ${id} supprimée avec succès.`);
            wrapper.remove();
          } catch (error) {
            console.log(error);
          }
          // window.location.reload();
          return false;
        };

        wrapper.appendChild(photos);
        wrapper.appendChild(deleteImgBtn);
        photoList.appendChild(wrapper);
      });
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des données : ", error)
    );
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

    ///////////////////////////////////////////////////////////////////// Galerie Photo
    const modal = document.createElement("div");
    modal.setAttribute("id", "modalId");
    modal.className = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent";

    const divButton = document.createElement("div");
    divButton.className = "divButton";

    const arrowBack = document.createElement("span");
    arrowBack.setAttribute("id", "back");
    arrowBack.innerHTML = '<i class="fa-sharp fa-solid fa-arrow-left"></i>';

    const modalCloseBtn = document.createElement("span");
    modalCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    modalCloseBtn.setAttribute("id", "closeBtn");

    const modalTitle = document.createElement("h2");
    modalTitle.innerText = "Galerie Photo";

    const photoList = document.createElement("div");
    photoList.setAttribute("id", "photoList");
    photoList.className = "photoList";

    const btnAjout = document.createElement("button");
    btnAjout.setAttribute("id", "btnAjout");
    btnAjout.innerText = "Ajouter une photo";
    btnAjout.addEventListener("click", addProjects);

    divButton.appendChild(arrowBack);
    divButton.appendChild(modalCloseBtn);
    modalContent.appendChild(divButton);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(photoList);
    modalContent.appendChild(btnAjout);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    ///////////////////////////////////////////////////////////////// Ajout des Projets

    function addProjects() {
      modalTitle.style.display = "none";
      photoList.style.display = "none";
      btnAjout.style.display = "none";
      arrowBack.style.display = "flex";

      const modalTitleAjout = document.createElement("h2");
      modalTitleAjout.innerText = "Ajout photo";
      const divAjoutPhoto = document.createElement("div");
      divAjoutPhoto.className = "divAjoutPhoto";
      const iconePaysage = document.createElement("span");
      iconePaysage.innerHTML = '<i class="fa-regular fa-image"></i>';
      const uploadImagePreview = document.createElement("img");
      uploadImagePreview.style.display = "none";
      uploadImagePreview.className = "uploadImagePreview";
      uploadImagePreview.setAttribute("id", "uploadImagePreview");
      uploadImagePreview.setAttribute("src", "#");
      const divUploadFile = document.createElement("div");
      divUploadFile.className = "divUploadFile";

      const divTextLabel = document.createElement("label");
      divTextLabel.setAttribute("for", "file");
      divTextLabel.className = "ajoutPhotoLabel";
      divTextLabel.innerText = "+ Ajout photo";

      const divTextInput = document.createElement("input");
      divTextInput.setAttribute("type", "file");
      divTextInput.setAttribute("id", "file");
      divTextInput.setAttribute("accept", ".jpg, .png");

      const pMoMax = document.createElement("p");
      pMoMax.innerText = "jpg, png : 4mo max";

      const divForm = document.createElement("div");
      divForm.className = "divForm";

      const formAjoutPhoto = document.createElement("form");
      formAjoutPhoto.setAttribute("id", "formAjoutPhoto");
      formAjoutPhoto.setAttribute("action", "");

      const inputLabel = document.createElement("label");
      inputLabel.setAttribute("for", "inputTitle");
      inputLabel.innerText = "Titre";

      const inputTitle = document.createElement("input");
      inputTitle.setAttribute("type", "text");
      inputTitle.setAttribute("id", "inputTitle");

      const label = document.createElement("label");
      label.setAttribute("for", "cat");
      label.innerText = "Catégorie";

      const select = document.createElement("select");
      select.setAttribute("id", "cat");
      select.setAttribute("name", "cat");
      select.setAttribute("accept", ".jpg, .png");
      // select.setAttribute("accept", ".png");

      const divBorder = document.createElement("div");
      divBorder.className = "divBorder";

      const btnValider = document.createElement("button");
      btnValider.setAttribute("id", "btnValider");
      btnValider.setAttribute("type", "submit");
      btnValider.innerText = "Valider";

      const options = [
        { value: "1", text: "Objets" },
        { value: "2", text: "Appartements" },
        { value: "3", text: "Hotels & restaurants" },
      ];
      // Permet d'avoir le champ catégorie vide de base
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      defaultOption.hidden = true;
      select.appendChild(defaultOption);

      options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.text = option.text;
        select.appendChild(opt);
      });

      divUploadFile.appendChild(divTextLabel);
      divUploadFile.appendChild(divTextInput);

      divAjoutPhoto.appendChild(iconePaysage);
      divAjoutPhoto.appendChild(uploadImagePreview);
      divAjoutPhoto.appendChild(divUploadFile);
      divAjoutPhoto.appendChild(pMoMax);

      divForm.appendChild(inputLabel);
      divForm.appendChild(inputTitle);
      divForm.appendChild(label);
      divForm.appendChild(select);
      divForm.appendChild(divBorder);

      divForm.appendChild(btnValider);

      formAjoutPhoto.appendChild(divAjoutPhoto);
      formAjoutPhoto.appendChild(divForm);

      modalContent.appendChild(modalTitleAjout);
      modalContent.appendChild(formAjoutPhoto);

      arrowBack.onclick = function () {
        modalTitle.style.display = "flex";
        photoList.style.display = "flex";
        btnAjout.style.display = "block";
        arrowBack.style.display = "none";
        divAjoutPhoto.style.display = "none";
        modalTitleAjout.style.display = "none";
        formAjoutPhoto.style.display = "none";
        btnValider.style.display = "none";
      };
      /////////////////////////////////////////////////// Preview de l'image sélectionnée
      divTextInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
          if (
            !["jpg", "png"].includes(file.name.toLowerCase().split(".").pop())
          ) {
            console.error("error extension");
            return;
          }
          // Message d'erreur
          if (Math.round(file.size / 1024) >= 4096) {
            console.error("file size");
            return;
            // Message d'erreur
          }
          const reader = new FileReader();
          reader.onload = function (e) {
            uploadImagePreview.src = e.target.result;
            uploadImagePreview.style.display = "block";
            divTextLabel.style.display = "none";
            divTextInput.style.display = "none";
            iconePaysage.style.display = "none";
            pMoMax.style.display = "none";
            divUploadFile.style.display = "none";
          };
          reader.readAsDataURL(file);
        }
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////// Envoie de nouveaux Projets
      //////////////////////////////////////////////////////////////////

      document
        .getElementById("formAjoutPhoto")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          const userFile = document.getElementById("file").files[0];
          const userFileTitle = document.getElementById("inputTitle").value;
          const userFileCat = document.getElementById("cat").value;
          const formAjoutPhoto = document.getElementById("formAjoutPhoto");

          // Supprimer les messages d'erreur existants
          const existingError = document.querySelector(".error-message");
          if (existingError) {
            existingError.remove();
          }

          //////////////////////////////////////////////////////////////////
          // Si tous les champs sont corrects, le bouton change de couleur
          btnValider.classList.add("btnValiderColor");
          //////////////////////////////////////////////////////////////////

          // Vérifier que tous les champs sont remplis
          if (!userFile || !userFileTitle || !userFileCat) {
            const errorForm = document.createElement("span");
            errorForm.innerText = "Le formulaire n'est pas correctement rempli";
            errorForm.className = "error-message";
            formAjoutPhoto.appendChild(errorForm);
            errorForm.style.display = "flex";
            return;
          }

          const reader = new FileReader();
          reader.onload = function (event) {
            // Obtenir la chaîne base64 sans le préfixe
            const base64Image = event.target.result.split(",")[1];

            // Débogage : Afficher la longueur de la chaîne base64
            console.log("Longueur de la chaîne base64 :", base64Image.length);

            // Convertir la base64 en chaîne binaire
            const binaryString = atob(base64Image);
            const binaryLength = binaryString.length;
            const byteArray = new Uint8Array(binaryLength);

            for (let i = 0; i < binaryLength; i++) {
              byteArray[i] = binaryString.charCodeAt(i);
            }

            const formData = new FormData();
            formData.append(
              "image",
              new Blob([byteArray], { type: userFile.type })
            );
            formData.append("title", userFileTitle);
            formData.append("category", parseInt(userFileCat, 10));

            // Débogage : Afficher le contenu de formData
            console.log("FormData contenu:");
            for (let [key, value] of formData.entries()) {
              console.log(
                `${key}: ${value instanceof Blob ? "[Blob]" : value}`
              );
            }

            fetch("http://localhost:5678/api/works", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${sessionToken}`,
              },
              body: formData,
            }).then((res) => {
              if (!res.ok) {
                return res.text().then((errorText) => {
                  throw new Error(
                    `Erreur HTTP ! statut : ${res.status}, message : ${errorText}`
                  );
                });
              }
              genPhoto();
              genWorks([]);
              formAjoutPhoto.reset();

              modalTitle.style.display = "flex";
              photoList.style.display = "flex";
              btnAjout.style.display = "block";
              arrowBack.style.display = "none";
              divAjoutPhoto.style.display = "none";
              modalTitleAjout.style.display = "none";
              formAjoutPhoto.style.display = "none";
              btnValider.style.display = "none";

              formAjoutPhoto.remove();
              return res.json();
            });
          };
          reader.readAsDataURL(userFile);
        });
      ////////////////////////////////////////////////////////////////
      checkFormFields();
      console.log("form checked");
      ////////////////////////////////////////////////////////////////
    }

    genPhoto();

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
  function checkFormFields() {
    const formAjoutPhoto = document.getElementById("formAjoutPhoto");
    const btnValider = document.getElementById("btnValider");
    const userFileInput = document.getElementById("file");
    const userFileTitleInput = document.getElementById("inputTitle");
    const userFileCatInput = document.getElementById("cat");

    const userFile = userFileInput.files[0];
    const userFileTitle = userFileTitleInput.value;
    const userFileCat = userFileCatInput.value;

    if (userFile && userFileTitle && userFileCat) {
      btnValider.classList.add("btnValiderColor");
      console.log("Validé");
    } else {
      btnValider.classList.remove("btnValiderColor");
      console.log("Non validé");
    }

    userFileInput.addEventListener("change", checkFormFields);
    userFileTitleInput.addEventListener("keyup", checkFormFields);
    userFileCatInput.addEventListener("change", checkFormFields);
  }
}

// Note: Il est plus performant de rédiger la modale sur la page HTML plutôt qu'en JS;
// pour l'apprentissage, la modale fut rédigée presque entièrement en JS.

// Rajouter erreur visible lorsque le fichier est trop lourd ou pas le bon format
