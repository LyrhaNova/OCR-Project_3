// ********************************************************************************************* VARIABLE(S)

const apiWorks = await fetch("http://localhost:5678/api/works");
// const getElement = (selector) => document.querySelector(selector);
const btnProjets = document.getElementById("projets");

btnProjets.addEventListener("click", function () {
  genWorks(worksList);
});

// *************************************************************************************** AFFICHAGE GALERIE

let worksList = [];
worksList = await apiWorks.json();

// Fonction de génération des <figures> de la galerie
export async function genWorks(filteredWorksList) {
  const divGallery = document.querySelector(".gallery");
  while (divGallery.firstChild) {
    divGallery.removeChild(divGallery.firstChild);
  }

  for (let i = 0; i < filteredWorksList.length; i++) {
    const article = filteredWorksList[i];

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
genWorks(worksList);

// ************************************************************************************************* FILTRES

// Fonction de filtrage
function filterWorks(categoryId) {
  if (categoryId === "all") {
    genWorks(worksList);
  } else {
    const filteredWorks = worksList.filter(function (work) {
      return work.categoryId === categoryId;
    });
    genWorks(filteredWorks);
  }
}

// Filtre Tous
const btnTous = document.querySelector(".btn-tous");
btnTous.addEventListener("click", function () {
  filterWorks("all");
});

// Filtre d'Objets
const btnObjects = document.querySelector(".btn-objets");
btnObjects.addEventListener("click", function () {
  filterWorks(1);
});

// Filtre d'Appartements
const btnAppt = document.querySelector(".btn-appt");
btnAppt.addEventListener("click", function () {
  filterWorks(2);
});

// Filtre d'Hôtels & Restaurants
const btnHotelsRest = document.querySelector(".btn-hotelsrest");
btnHotelsRest.addEventListener("click", function () {
  filterWorks(3);
});

// ************************************************************************************************* LOG OUT

const btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", function (event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  sessionStorage.clear();
  window.location.href = "index.html";
});
