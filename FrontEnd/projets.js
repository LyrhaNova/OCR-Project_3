///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////// Général
// Appel de l'API -> /works
const apiWorks = await fetch("http://localhost:5678/api/works");

const getElement = (selector) => document.querySelector(selector);

// Appel des modules lorsque l'on clique sur "projets"
const btnProjets = document.getElementById("projets");

btnProjets.addEventListener("click", function () {
  // Permet d'afficher tous les projets au retour de l'index
  genWorks(worksList);
});

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Génération dynamique des projets

let worksList = [];
worksList = await apiWorks.json();

console.table(worksList);

// Fonction de génération des <figures> de la galerie
function genWorks(worksList) {
  for (let i = 0; i < worksList.length; i++) {
    const article = worksList[i];

    const divGallery = document.querySelector(".gallery");

    const figureWorks = document.createElement("figure");
    figureWorks.dataset.id = worksList[i].id;
    const imageWorks = document.createElement("img");
    imageWorks.src = article.imageUrl;
    const figcapWorks = document.createElement("figcaption");
    figcapWorks.innerText = article.title;

    divGallery.appendChild(figureWorks);
    figureWorks.appendChild(imageWorks);
    figureWorks.appendChild(figcapWorks);
  }
}

genWorks(worksList);

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////// Filtres

const categoryWorksSet = new Set(
  worksList.map((mapCatId) => mapCatId.categoryId)
);
// Le Set ne permet pas d'utiliser .filter, on le change donc en Array
const categoryWorksList = Array.from(categoryWorksSet);

// Filtre Tous
const btnTous = document.querySelector(".btnTous");
btnTous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  genWorks(worksList);
});

// Filtre d'Objets
const btnObjects = document.querySelector(".btnObjets");
btnObjects.addEventListener("click", function () {
  const objectsFilter = worksList.filter(function (categoryWorksList) {
    return categoryWorksList.categoryId === 1;
  });
  console.table(objectsFilter);
  document.querySelector(".gallery").innerHTML = "";
  genWorks(objectsFilter);
});

// Filtre d'Appartements
const btnAppt = document.querySelector(".btnAppt");
btnAppt.addEventListener("click", function () {
  const apptFilter = worksList.filter(function (categoryWorksList) {
    return categoryWorksList.categoryId === 2;
  });
  console.table(apptFilter);
  document.querySelector(".gallery").innerHTML = "";
  genWorks(apptFilter);
});

// Filtre d'Hôtels & Restaurants
const btnHotelsRest = document.querySelector(".btnHotelsRest");
btnHotelsRest.addEventListener("click", function () {
  const HotelsRestFilter = worksList.filter(function (categoryWorksList) {
    return categoryWorksList.categoryId === 3;
  });
  console.table(HotelsRestFilter);
  document.querySelector(".gallery").innerHTML = "";
  genWorks(HotelsRestFilter);
});

// À rectifier : le focus des btns du filtre qui partent à la plage

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// Gestion du log-out

const btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", function (event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  sessionStorage.clear();
  window.location.href = "index.html";
});

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
