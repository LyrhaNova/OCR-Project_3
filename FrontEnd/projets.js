///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////// Général

const apiWorks = await fetch("http://localhost:5678/api/works");
const getElement = (selector) => document.querySelector(selector);
const btnProjets = document.getElementById("projets");

btnProjets.addEventListener("click", function () {
  genWorks(worksList);
});

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Génération dynamique des projets

let worksList = [];
worksList = await apiWorks.json();

// Fonction de génération des <figures> de la galerie
export async function genWorks() {
  const worksList = await fetch("http://localhost:5678/api/works").then((res) =>
    res.json()
  );

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

console.table(worksList);
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
  console.table(worksList);
});

// Filtre d'Objets
const btnObjects = document.querySelector(".btnObjets");
btnObjects.addEventListener("click", function () {
  const objectsFilter = worksList.filter(function (work) {
    return work.categoryId === 1;
  });
  console.table(objectsFilter);
  document.querySelector(".gallery").innerHTML = "";
  genWorks(objectsFilter);
});

// Filtre d'Appartements
const btnAppt = document.querySelector(".btnAppt");
btnAppt.addEventListener("click", function () {
  const apptFilter = worksList.filter(function (work) {
    return work.categoryId === 2;
  });
  console.table(apptFilter);
  document.querySelector(".gallery").innerHTML = "";
  genWorks(apptFilter);
});

// Filtre d'Hôtels & Restaurants
const btnHotelsRest = document.querySelector(".btnHotelsRest");
btnHotelsRest.addEventListener("click", function () {
  const HotelsRestFilter = worksList.filter(function (work) {
    return work.categoryId === 3;
  });
  console.table(HotelsRestFilter);
  document.querySelector(".gallery").innerHTML = "";
  genWorks(HotelsRestFilter);
});

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// Gestion du log-out

const btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", function (event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  sessionStorage.clear();
  window.location.href = "index.html";
});
