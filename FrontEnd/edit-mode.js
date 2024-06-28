// ********************************************************************************************* VARIABLE(S)

// Api variables & constants
import { genWorks } from "./projets.js";

// Session Storage
let sessionToken = sessionStorage.getItem("token");

// HTML tag selection/navigation constants
const body = document.querySelector("body");
const header = document.querySelector("header");
const titlePortfolio = document.getElementById("mesProjets");

// ****************************************************************************************** FETCH FUNCTION

async function fetchApiData() {
  const apiWorks = await fetch("http://localhost:5678/api/works");
  const worksList = await apiWorks.json();
}

// ******************************************************************************************* CORE FUNCTION

(async function core() {
  await fetchApiData();

  const log = logStatus();

  displayElements(log);
})();

// ***************************************************************************************** CHECK FUNCTIONS

function logStatus(log) {
  let logStatus = false;
  const btnLogout = document.getElementById("logout");
  const btnLogin = document.getElementById("login");
  const filters = document.querySelector(".filters");

  if (sessionToken !== null) {
    logStatus = true;

    btnLogout.style.display = "block";
    btnLogin.style.display = "none";
    filters.style.display = "none";

    return logStatus;
  }
  btnLogout.style.display = "none";
  btnLogin.style.display = "block";

  return logStatus;
}

// ******************************************************************************* DISPLAY ELEMENT FUNCTIONS

function displayElements(log) {
  if (log) {
    displaySiteElements();
    displayFirstModalElements();
    displaySecondModalElements();
    ModalProcessing();
  }
}

// *********************************************************************************************** FUNCTIONS

function displaySiteElements() {
  let querySelectorDivEdition = document.querySelector("editionMode");

  if (!querySelectorDivEdition) {
    header.className = "marginHeader";
    // Création du mode édition
    const divEditionElement = divEdCreate(querySelectorDivEdition);
    const iElement = iCreate();
    const pElement = pCreate();
    const divModElement = divModCreate();
    const mElement = mCreate();
    const imElement = imCreate();

    body.insertBefore(divEditionElement, body.firstChild);

    appendChildSiteElements(
      divEditionElement,
      iElement,
      pElement,
      divModElement,
      mElement,
      imElement
    );
  }
}

function displayFirstModalElements() {
  const modalElement = modalCreate();
  const modalContent1Element = modalContent1Create();
  const divButtonElement = divButtonCreate();
  const modalCloseBtnElement = modalCloseBtnCreate();
  const modalTitleElement = modalTitleCreate();
  const photoListElement = photoListCreate();
  const btnAjoutElement = btnAjoutCreate();

  appendChildFirstModal(
    modalElement,
    modalContent1Element,
    divButtonElement,
    modalCloseBtnElement,
    modalTitleElement,
    photoListElement,
    btnAjoutElement
  );

  modalContent1Element.style.display = "none";
}

function displaySecondModalElements() {
  const modalContent2Element = modalContent2Create();
  const divButton2Element = divButton2Create();
  const arrowBackElement = arrowBackCreate();
  const modalCloseBtn2Element = modalCloseBtn2Create();
  const modalTitleAjoutElement = modalTitleAjoutCreate();

  const divAjoutPhotoElement = divAjoutPhotoCreate();
  const iconePaysageElement = iconePaysageCreate();
  const divUploadFileElement = divUploadFileCreate();
  const uploadImagePreviewElement = uploadImagePreviewCreate();
  const divTextLabelElement = divTextLabelCreate();
  const divTextInputElement = divTextInputCreate();
  const pMoMaxElement = pMoMaxCreate();
  const errorFormSizeElement = errorFormSizeCreate();

  const divFormElement = divFormCreate();
  const formAjoutPhotoElement = formAjoutPhotoCreate();
  const inputLabelElement = inputLabelCreate();
  const inputTitleElement = inputTitleCreate();
  const labelElement = labelCreate();
  const selectElement = selectCreate();
  const divBorderElement = divBorderCreate();
  const btnValiderElement = btnValiderCreate();
  const defaultOptionElement = defaultOptionCreate();
  const errorFormElement = errorFormCreate();

  appendChildSecondModal(
    modalContent2Element,
    divButton2Element,
    arrowBackElement,
    modalCloseBtn2Element,
    modalTitleAjoutElement,
    divAjoutPhotoElement,
    iconePaysageElement,
    uploadImagePreviewElement,
    divUploadFileElement,
    divTextLabelElement,
    divTextInputElement,
    pMoMaxElement,
    errorFormSizeElement,
    divFormElement,
    formAjoutPhotoElement,
    inputLabelElement,
    inputTitleElement,
    labelElement,
    selectElement,
    divBorderElement,
    btnValiderElement,
    defaultOptionElement,
    errorFormElement
  );
  // Génération des options de l'input select (catégories)
  const options = [
    { value: "1", text: "Objets" },
    { value: "2", text: "Appartements" },
    { value: "3", text: "Hotels & restaurants" },
  ];
  // Récupération et stockage des valeurs des options
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.text = option.text;
    selectElement.appendChild(opt);
  });

  modalContent2Element.style.display = "none";
}

// *********************************************************************************** ADD PROJECT FUNCTIONS

function ModalProcessing() {
  const arrowBack = document.getElementById("back");
  const modal = document.getElementById("modalId");
  const firstPage = document.getElementById("modalContent1");
  const secondPage = document.getElementById("modalContent2");

  onChangeButton(modal, firstPage, secondPage);
  onAddButton(modal, firstPage, secondPage);
  onWindowClick();
  onCLoseButton(modal);
  onSelectPicture();
  onFormSubmit(firstPage, secondPage);
  arrowBackModalProcessing(arrowBack, firstPage, secondPage);
}

// ************************************************************************************ PROCESSING FUNCTIONS

// Fonction permettant d'afficher la modale via le bouton Modifier
function onChangeButton(modal, firstPage, secondPage) {
  const btnModifier = document.getElementById("btnModifier");

  btnModifier.onclick = function () {
    modal.style.display = "flex";
    firstPage.style.display = "flex";
    secondPage.style.display = "none";
    // Génération dynamique de la galerie
    genPhoto();
  };
}

// Fonction de génération des photos dans la modale et leur suppression
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

        // Ajout du bouton de suppression immédiatement
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
            fetchAndGenerateGallery();
          } catch (error) {
            console.log(error);
          }
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
// Function du bouton d'ajout de projets, changeant l'affichage
function onAddButton(modal, firstPage, secondPage) {
  const btnAjout = document.getElementById("btnAjout");
  const iconePaysage = document.getElementById("iconePaysage");

  btnAjout.addEventListener("click", function () {
    firstPage.style.display = "none";
    secondPage.style.display = "flex";
    document.getElementById("formAjoutPhoto").reset();
    if (iconePaysage !== "flex") {
      document.getElementById("uploadImagePreview").style.display = "none";
      document.getElementById("divTextLabel").style.display = "flex";
      document.getElementById("file").style.display = "none";
      iconePaysage.style.display = "flex";
      document.getElementById("pMoMax").style.display = "flex";
      document.getElementById("divUploadFile").style.display = "flex";
    }
    const selectCat = document.getElementById("cat");
    selectCat.value = "";
  });
}

function onCLoseButton(modal) {
  const btnClose = document.getElementById("closeBtn");

  btnClose.onclick = function () {
    modal.style.display = "none";
    document.getElementById("formAjoutPhoto").reset();
  };
  const btnClose2 = document.getElementById("closeBtn2");

  btnClose2.onclick = function () {
    modal.style.display = "none";
    document.getElementById("formAjoutPhoto").reset();
  };
}

function onWindowClick() {
  window.onclick = function (event) {
    const modal = document.getElementById("modalId");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Fonction permettant la preview de l'image choisie et génération des erreurs liées
function onSelectPicture() {
  const uploadImagePreview = document.getElementById("uploadImagePreview");
  const divTextLabel = document.getElementById("divTextLabel");
  const divTextInput = document.getElementById("file");
  const iconePaysage = document.getElementById("iconePaysage");
  const pMoMax = document.getElementById("pMoMax");
  const divUploadFile = document.getElementById("divUploadFile");
  divTextInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      if (!["jpg", "png"].includes(file.name.toLowerCase().split(".").pop())) {
        console.error("error extension");
        return;
      }
      // Message d'erreur si le poids est supérieur à 4mo
      if (Math.round(file.size / 1024) >= 4096) {
        const errorFormSize = document.getElementById("errorFormSize");
        errorFormSize.style.display = "flex";
        console.error("file size");
        return;
      } else {
        const errorFormSize = document.getElementById("errorFormSize");
        errorFormSize.style.display = "none";
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
}

// Function d'envoie d'un nouveau projet via le formulaire
function onFormSubmit(firstPage, secondPage) {
  document
    .getElementById("formAjoutPhoto")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      let userFile = document.getElementById("file").files[0];

      const userFileTitle = document.getElementById("inputTitle").value;
      const userFileCat = document.getElementById("cat").value;
      const formAjoutPhoto = document.getElementById("formAjoutPhoto");

      // Gestion des erreurs du formulaire
      if (!userFile || !userFileTitle || !userFileCat) {
        const errorForm = document.getElementById("errorForm");
        errorForm.style.display = "flex";
        console.log("Form validation failed");
        return;
      } else {
        const errorForm = document.getElementById("errorForm");
        errorForm.style.display = "none";
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        // Obtention de la chaîne base64 sans le préfixe
        const base64Image = event.target.result.split(",")[1];
        //Convertis la base64 en chaîne binaire
        const binaryString = atob(base64Image); // Convertir la base64 en chaîne binaire
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

        fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
          body: formData,
        })
          .then((res) => {
            if (!res.ok) {
              return res.text().then((errorText) => {
                throw new Error(
                  `Erreur HTTP ! statut : ${res.status}, message : ${errorText}`
                );
              });
            }
            return res.json();
          })
          .then((data) => {
            console.log("Form submission successful", data);
            fetchAndGenerateGallery();
            document.getElementById("file").value = "";
            document.getElementById("inputTitle").value = "";
            document.getElementById("cat").selectedIndex = 0;
            console.log((document.getElementById("file").value = ""));

            console.log("Form reset");
            firstPage.style.display = "flex";
            secondPage.style.display = "none";
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
      reader.readAsDataURL(userFile);
      document.getElementById("btnValider").classList.remove("btnValiderColor");
      formAjoutPhoto.reset();
    });
  checkFormFields();
}

// Fonction vérifiant si le formulaire est remplis correctement
function checkFormFields() {
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

// Fonction permettant d'actualiser la galerie modale
async function fetchAndGenerateGallery() {
  try {
    const apiWorks = await fetch("http://localhost:5678/api/works");
    const worksList = await apiWorks.json();
    generateGallery(worksList);
    genPhoto();
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux :", error);
  }
}

// Fonction permettant la génération de la galerie (index)
async function generateGallery(worksList) {
  const divGallery = document.querySelector(".gallery");
  divGallery.innerHTML = "";
  for (let i = 0; i < worksList.length; i++) {
    const article = worksList[i];

    const figureWorks = document.createElement("figure");
    figureWorks.dataset.id = article.id;
    const imageWorks = document.createElement("img");
    imageWorks.src = article.imageUrl;
    const figcapWorks = document.createElement("figcaption");
    figcapWorks.innerText = article.title;

    divGallery.appendChild(figureWorks);
    figureWorks.appendChild(imageWorks);
    figureWorks.appendChild(figcapWorks);
  }
}

function arrowBackModalProcessing(arrowBack, firstPage, secondPage) {
  arrowBack.onclick = function () {
    firstPage.style.display = "flex";
    secondPage.style.display = "none";
  };
}

// ***************************************************************************************** CREATE ELEMENTS

function divEdCreate(nom) {
  nom = document.createElement("div");
  nom.className = "divEdition";
  nom.style.display = "flex";
  return nom;
}

function iCreate() {
  const i = document.createElement("i");
  i.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  return i;
}

function pCreate() {
  const p = document.createElement("p");
  p.innerText = "Mode édition";
  return p;
}

function divModCreate() {
  const divModifier = document.createElement("div");
  divModifier.className = "modifierProjets";
  return divModifier;
}

function mCreate() {
  const m = document.createElement("button");
  m.innerText = "modifier";
  m.setAttribute("id", "btnModifier");
  return m;
}

function imCreate() {
  const im = document.createElement("i");
  im.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  return im;
}

function modalCreate() {
  const modal = document.createElement("div");
  modal.setAttribute("id", "modalId");
  modal.className = "modal";
  return modal;
}

function modalContent1Create() {
  const modalContent1 = document.createElement("div");
  modalContent1.setAttribute("id", "modalContent1");
  modalContent1.className = "modalContent";
  return modalContent1;
}

function divButtonCreate() {
  const divButton = document.createElement("div");
  divButton.setAttribute("id", "divButton");
  divButton.className = "divButton";
  return divButton;
}

function arrowBackCreate() {
  const arrowBack = document.createElement("div");
  arrowBack.setAttribute("id", "back");
  arrowBack.innerHTML = '<i class="fa-sharp fa-solid fa-arrow-left"></i>';
  return arrowBack;
}

function modalCloseBtnCreate() {
  const modalCloseBtn = document.createElement("span");
  modalCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  modalCloseBtn.setAttribute("id", "closeBtn");
  return modalCloseBtn;
}

function modalTitleCreate() {
  const modalTitle = document.createElement("h2");
  modalTitle.innerText = "Galerie Photo";
  modalTitle.setAttribute("id", "modalTitle");
  return modalTitle;
}

function photoListCreate() {
  const photoList = document.createElement("div");
  photoList.setAttribute("id", "photoList");
  photoList.className = "photoList";
  return photoList;
}

function btnAjoutCreate() {
  const btnAjout = document.createElement("button");
  btnAjout.setAttribute("id", "btnAjout");
  btnAjout.innerText = "Ajouter une photo";
  return btnAjout;
}

function modalTitleAjoutCreate() {
  const modalTitleAjout = document.createElement("h2");
  modalTitleAjout.setAttribute("id", "modalTitleAjout");
  modalTitleAjout.innerText = "Ajout photo";
  return modalTitleAjout;
}

function divAjoutPhotoCreate() {
  const divAjoutPhoto = document.createElement("div");
  divAjoutPhoto.setAttribute("id", "divAjoutPhoto");
  divAjoutPhoto.className = "divAjoutPhoto";
  return divAjoutPhoto;
}

function iconePaysageCreate() {
  const iconePaysage = document.createElement("span");
  iconePaysage.innerHTML = '<i class="fa-regular fa-image"></i>';
  iconePaysage.setAttribute("id", "iconePaysage");
  return iconePaysage;
}

function uploadImagePreviewCreate() {
  const uploadImagePreview = document.createElement("img");
  uploadImagePreview.style.display = "none";
  uploadImagePreview.className = "uploadImagePreview";
  uploadImagePreview.setAttribute("id", "uploadImagePreview");
  uploadImagePreview.setAttribute("src", "#");
  return uploadImagePreview;
}

function divUploadFileCreate() {
  const divUploadFile = document.createElement("div");
  divUploadFile.setAttribute("id", "divUploadFile");
  divUploadFile.className = "divUploadFile";
  return divUploadFile;
}

function divTextLabelCreate() {
  const divTextLabel = document.createElement("label");
  divTextLabel.setAttribute("for", "file");
  divTextLabel.setAttribute("id", "divTextLabel");
  divTextLabel.className = "ajoutPhotoLabel";
  divTextLabel.innerText = "+ Ajout photo";
  return divTextLabel;
}

function divTextInputCreate() {
  const divTextInput = document.createElement("input");
  divTextInput.setAttribute("type", "file");
  divTextInput.setAttribute("id", "file");
  divTextInput.setAttribute("accept", ".jpg, .png");
  return divTextInput;
}

function pMoMaxCreate() {
  const pMoMax = document.createElement("p");
  pMoMax.setAttribute("id", "pMoMax");
  pMoMax.innerText = "jpg, png : 4mo max";
  return pMoMax;
}

function divFormCreate() {
  const divForm = document.createElement("div");
  divForm.className = "divForm";
  return divForm;
}

function formAjoutPhotoCreate() {
  const formAjoutPhoto = document.createElement("form");
  formAjoutPhoto.setAttribute("id", "formAjoutPhoto");
  formAjoutPhoto.setAttribute("action", "");
  return formAjoutPhoto;
}

function inputLabelCreate() {
  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", "inputTitle");
  inputLabel.innerText = "Titre";
  return inputLabel;
}

function inputTitleCreate() {
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("id", "inputTitle");
  return inputTitle;
}

function labelCreate() {
  const label = document.createElement("label");
  label.setAttribute("for", "cat");
  label.innerText = "Catégorie";
  return label;
}

function selectCreate() {
  const select = document.createElement("select");
  select.setAttribute("id", "cat");
  select.setAttribute("name", "cat");
  select.setAttribute("accept", ".jpg, .png");
  return select;
}

function divBorderCreate() {
  const divBorder = document.createElement("div");
  divBorder.className = "divBorder";
  return divBorder;
}

function btnValiderCreate() {
  const btnValider = document.createElement("button");
  btnValider.setAttribute("id", "btnValider");
  btnValider.setAttribute("type", "submit");
  btnValider.innerText = "Valider";
  return btnValider;
}

function modalContent2Create() {
  const modalContent2 = document.createElement("div");
  modalContent2.setAttribute("id", "modalContent2");
  modalContent2.className = "modalContent";
  return modalContent2;
}

function defaultOptionCreate() {
  const defaultOptionElement = document.createElement("option");
  defaultOptionElement.value = "";
  defaultOptionElement.text = "";
  defaultOptionElement.disabled = true;
  defaultOptionElement.hidden = true;
  return defaultOptionElement;
}

function divButton2Create() {
  const divButton2 = document.createElement("div");
  divButton2.setAttribute("id", "divButton2");
  divButton2.className = "divButton";
  return divButton2;
}

function modalCloseBtn2Create() {
  const modalCloseBtn2 = document.createElement("span");
  modalCloseBtn2.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  modalCloseBtn2.setAttribute("id", "closeBtn2");
  return modalCloseBtn2;
}

function errorFormCreate() {
  const errorForm = document.createElement("span");
  errorForm.setAttribute("id", "errorForm");
  errorForm.innerText = "Le formulaire n'est pas correctement rempli";
  errorForm.className = "error-message";
  return errorForm;
}

function errorFormSizeCreate() {
  const errorFormSize = document.createElement("span");
  errorFormSize.setAttribute("id", "errorFormSize");
  errorFormSize.innerText = "Le fichier est trop lourd ! 4mo max";
  errorFormSize.className = "error-messageSize";
  return errorFormSize;
}

// ***************************************************************************************** APPEND ELEMENTS

function appendChildSiteElements(
  divEditionElement,
  iElement,
  pElement,
  divModElement,
  mElement,
  imElement
) {
  divEditionElement.appendChild(iElement);
  divEditionElement.appendChild(pElement);
  titlePortfolio.appendChild(divModElement);
  divModElement.appendChild(imElement);
  divModElement.appendChild(mElement);
}

function appendChildFirstModal(
  modalElement,
  modalContent1Element,
  divButtonElement,
  modalCloseBtnElement,
  modalTitleElement,
  photoListElement,
  btnAjoutElement
) {
  divButtonElement.appendChild(modalCloseBtnElement);
  modalContent1Element.appendChild(divButtonElement);
  modalContent1Element.appendChild(modalTitleElement);
  modalContent1Element.appendChild(photoListElement);
  modalContent1Element.appendChild(btnAjoutElement);
  modalElement.appendChild(modalContent1Element);
  document.body.appendChild(modalElement);
}

function appendChildSecondModal(
  modalContent2Element,
  divButton2Element,
  arrowBackElement,
  modalCloseBtn2Element,
  modalTitleAjoutElement,
  divAjoutPhotoElement,
  iconePaysageElement,
  uploadImagePreviewElement,
  divUploadFileElement,
  divTextLabelElement,
  divTextInputElement,
  pMoMaxElement,
  errorFormSizeElement,
  divFormElement,
  formAjoutPhotoElement,
  inputLabelElement,
  inputTitleElement,
  labelElement,
  selectElement,
  divBorderElement,
  btnValiderElement,
  defaultOptionElement,
  errorFormElement
) {
  const modalElement = document.getElementById("modalId");

  divButton2Element.appendChild(arrowBackElement);
  divButton2Element.appendChild(modalCloseBtn2Element);

  divUploadFileElement.appendChild(divTextLabelElement);
  divUploadFileElement.appendChild(divTextInputElement);

  divAjoutPhotoElement.appendChild(iconePaysageElement);
  divAjoutPhotoElement.appendChild(uploadImagePreviewElement);
  divAjoutPhotoElement.appendChild(divUploadFileElement);
  divAjoutPhotoElement.appendChild(pMoMaxElement);
  divAjoutPhotoElement.appendChild(errorFormSizeElement);

  selectElement.appendChild(defaultOptionElement);

  divFormElement.appendChild(inputLabelElement);
  divFormElement.appendChild(inputTitleElement);
  divFormElement.appendChild(labelElement);
  divFormElement.appendChild(selectElement);
  divFormElement.appendChild(divBorderElement);
  divFormElement.appendChild(btnValiderElement);
  divFormElement.appendChild(errorFormElement);

  formAjoutPhotoElement.appendChild(divAjoutPhotoElement);
  formAjoutPhotoElement.appendChild(divFormElement);

  modalContent2Element.appendChild(divButton2Element);
  modalContent2Element.appendChild(modalTitleAjoutElement);
  modalContent2Element.appendChild(formAjoutPhotoElement);

  modalElement.appendChild(modalContent2Element);
  modalElement.appendChild(modalContent2Element);
}
