import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  const url = config.backendEndpoint + "/adventures?city=" + city;
  let adventures = await fetch(url)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return null;
    });

  return adventures;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  let dataDiv = document.getElementById("data");

  for (let i = 0; i < adventures.length; i++) {
    let childDiv = document.createElement("div");
    let toAddClasses = ["col-md-3", "col-6"];
    childDiv.classList.add(...toAddClasses);
    dataDiv.appendChild(childDiv);

    let a = document.createElement("a");
    a.href = `detail/?adventure=${adventures[i].id}`;
    a.setAttribute("id", adventures[i].id);
    childDiv.appendChild(a);

    let activityCardDiv = document.createElement("div");
    activityCardDiv.classList.add("activity-card");

    a.appendChild(activityCardDiv);

    let img = document.createElement("img");
    img.src = adventures[i].image;
    img.classList.add("img-fluid");

    activityCardDiv.appendChild(img);

    let bannerDiv = document.createElement("div");
    bannerDiv.classList.add("category-banner");
    bannerDiv.innerText = adventures[i].category;

    activityCardDiv.appendChild(bannerDiv);

    let textAreaDiv = document.createElement("div");
    textAreaDiv.classList.add("text-area");

    activityCardDiv.appendChild(textAreaDiv);

    let textDiv1 = document.createElement("div");
    textDiv1.classList.add("text");
    textAreaDiv.appendChild(textDiv1);

    let name = document.createElement("div");
    name.innerText = adventures[i].name;
    textDiv1.append(name);

    let costPerHead = document.createElement("div");
    costPerHead.innerText = "₹" + adventures[i].costPerHead;
    textDiv1.append(costPerHead);

    let textDiv2 = document.createElement("div");
    textDiv2.classList.add("text");
    textAreaDiv.appendChild(textDiv2);

    let duration = document.createElement("div");
    duration.innerText = "Duration";
    textDiv2.append(duration);

    let durationTime = document.createElement("div");
    durationTime.innerText = adventures[i].duration + " hours";
    textDiv2.append(durationTime);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 
  let result = [];
  let k=0;
  for (let i = 0; i < list.length; i++) {
    let adventureDuration = list[i].duration;
    if(adventureDuration >= low && adventureDuration <= high){
      result[k++] = list[i];
    }
  }
  return result;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  const result = [];
  let k = 0;
  for (let i = 0; i < categoryList.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (categoryList[i] == list[j].category) {
        result[k++] = list[j];
      }
    }
  }

  return result;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  let arr = filters.duration.split("-");
  let low = arr[0];
  let high = arr[1];
  if(filters.duration != "" && filters.category.length != 0){
    let result1 = filterByDuration(list, low, high);
    let result2 = filterByCategory(result1, filters.category);
    return result2;
  }
  else if (filters.duration != "") {
    return filterByDuration(list, low, high);
    
  }
   else if (filters.category.length != 0) {
    return filterByCategory(list, filters.category);
  }
  else{
    let data = document.getElementById("data");
    data.innerHTML = "";
    return list;
  }

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = window.localStorage.getItem('filters');
  return JSON.parse(filters);
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = document.getElementById("category-list");

  for (let i = 0; i < filters.category.length; i++) {
    let categoryFilter = document.createElement("div");
    categoryFilter.classList.add("category-filter");
    categoryFilter.innerText = filters.category[i];
    categoryList.appendChild(categoryFilter);
  }
  document.getElementById('duration-select').value = filters.duration;
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
