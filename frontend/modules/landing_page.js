import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  console.log(cities);
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const url = config.backendEndpoint + "/cities";
  const cities = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return cities;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parentDiv = document.getElementById("data");
  let childDiv = document.createElement("div");
  
  let toAddClasses = ['tile','col-lg-3','col-md-6'];
  childDiv.classList.add(toAddClasses[1]);
  childDiv.classList.add(toAddClasses[2]);

  parentDiv.appendChild(childDiv);

  let a = document.createElement("a");
  a.href = `pages/adventures/?city=${id}`;
  a.setAttribute("id", id);

  childDiv.appendChild(a);

  let tileDiv = document.createElement("div");
  tileDiv.classList.add(toAddClasses[0]);

  a.appendChild(tileDiv);

  let img = document.createElement("img");
  img.src = image;
  
  tileDiv.appendChild(img);

  let textDiv = document.createElement("div");
  textDiv.classList.add("tile-text");

  tileDiv.appendChild(textDiv);

  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  p1.innerText = city;
  p2.innerText = description;

  textDiv.appendChild(p1);
  textDiv.appendChild(p2);

}

export { init, fetchCities, addCityToDOM };
