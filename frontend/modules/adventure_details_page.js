import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const url = new URLSearchParams(search);
  // Place holder for functionality to work in the Stubs

  return url.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  // Place holder for functionality to work in the Stubs
  const url =
    config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;

  try {
    let result = await fetch(url)
      .then((res) => res.json())
      .then((response) => {
        return response;
      });

    return result;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML = adventure.name;

  let adventureSub = document.getElementById("adventure-subtitle");
  adventureSub.innerHTML = adventure.subtitle;

  let photoGallery = document.getElementById("photo-gallery");
  for (let i = 0; i < adventure.images.length; i++) {
    let img = document.createElement("img");
    img.src = adventure.images[i];
    img.classList.add("activity-card-image");
    photoGallery.appendChild(img);
  }

  let adventureContent = document.getElementById("adventure-content");
  adventureContent.innerText = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = `  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="inner">
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  let innerDiv = document.getElementById("inner");

  for (let i = 0; i < images.length; i++) {
    let div = document.createElement("div");
    div.classList.add("carousel-item");
    if (i == 0) {
      div.classList.add("active");
    }

    let img = document.createElement("img");
    img.src = images[i];
    img.classList.add("activity-card-image");
    div.appendChild(img);
    innerDiv.appendChild(div);
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOutPanel = document.getElementById("reservation-panel-sold-out");
  let reservationPanel = document.getElementById("reservation-panel-available");
  if (adventure.available === true) {
    soldOutPanel.style.display = "none";
    reservationPanel.style.display = "block";

    let costPerHead = document.getElementById("reservation-person-cost");
    costPerHead.innerHTML = adventure.costPerHead;
  } else {
    reservationPanel.style.display = "none";
    soldOutPanel.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead = adventure.costPerHead;
  let totalCost = persons * costPerHead;

  let totalReservationCost = document.getElementById("reservation-cost");
  totalReservationCost.innerHTML = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const date = document.getElementById("date");
    const person = document.getElementById("person");
    const adventureId = adventure.id;

    const data = {
      name: name.value,
      date: date.value,
      person: person.value,
      adventure: adventureId,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(data);
    let url = config.backendEndpoint + "/reservations/new";
     fetch(url, options)
      .then((data) => {
        
        alert("Success");
        location.reload();
      })
      .catch((err) => {
        
        alert("Failed");
        return null;
      });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById('reserved-banner');
  if(adventure.reserved){
    reservedBanner.style.display = "block";
  }else{
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
